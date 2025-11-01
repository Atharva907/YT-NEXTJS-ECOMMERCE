
import { connectDB } from "@/lib/databaseConnection";
import { ObjectId } from "mongodb";

// GET - Fetch wallet balance and transactions for a player
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return Response.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const db = await connectDB();

    // Find player's wallet or create one if it doesn't exist
    let wallet = await db.db.collection("wallets").findOne({ playerEmail: email });

    if (!wallet) {
      // Create a new wallet for the player
      const newWallet = {
        playerEmail: email,
        balance: 0,
        transactions: [],
        createdAt: new Date()
      };

      const result = await db.db.collection("wallets").insertOne(newWallet);

      if (result.acknowledged) {
        wallet = {
          _id: result.insertedId,
          ...newWallet
        };
      } else {
        return Response.json(
          { error: "Failed to create wallet" },
          { status: 500 }
        );
      }
    }

    return Response.json({
      success: true,
      balance: wallet.balance,
      transactions: wallet.transactions
    });
  } catch (error) {
    console.error("Error fetching wallet:", error);
    return Response.json(
      { error: "Failed to fetch wallet" },
      { status: 500 }
    );
  }
}

// POST - Add funds to wallet or process withdrawal
export async function POST(request) {
  try {
    const {
      email,
      amount,
      type, // "deposit" or "withdraw"
      method, // "paypal", "bank", "crypto"
      description
    } = await request.json();

    if (!email || !amount || !type) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (type !== "deposit" && type !== "withdraw") {
      return Response.json(
        { error: "Invalid transaction type" },
        { status: 400 }
      );
    }

    if (parseFloat(amount) <= 0) {
      return Response.json(
        { error: "Amount must be greater than 0" },
        { status: 400 }
      );
    }

    const db = await connectDB();

    // Find player's wallet
    const wallet = await db.db.collection("wallets").findOne({ playerEmail: email });

    if (!wallet) {
      return Response.json(
        { error: "Wallet not found" },
        { status: 404 }
      );
    }

    const transactionAmount = parseFloat(amount);

    // For withdrawals, check if sufficient balance
    if (type === "withdraw" && wallet.balance < transactionAmount) {
      return Response.json(
        { error: "Insufficient balance" },
        { status: 400 }
      );
    }

    // Calculate new balance
    const newBalance = type === "deposit" 
      ? wallet.balance + transactionAmount 
      : wallet.balance - transactionAmount;

    // Create new transaction
    const newTransaction = {
      id: new ObjectId().toString(),
      date: new Date().toLocaleDateString(),
      type: type === "deposit" ? "Deposit" : "Withdrawal",
      amount: type === "deposit" ? transactionAmount : -transactionAmount,
      method: method || "",
      description: description || "",
      status: type === "deposit" ? "completed" : "pending"
    };

    // Update wallet
    const result = await db.db.collection("wallets").updateOne(
      { playerEmail: email },
      {
        $set: { balance: newBalance },
        $push: { transactions: { $each: [newTransaction], $position: 0 } }
      }
    );

    if (result.acknowledged) {
      return Response.json({
        success: true,
        message: `${type === "deposit" ? "Deposit" : "Withdrawal"} successful`,
        balance: newBalance,
        transaction: newTransaction
      });
    } else {
      return Response.json(
        { error: `Failed to process ${type}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing wallet transaction:", error);
    return Response.json(
      { error: "Failed to process transaction" },
      { status: 500 }
    );
  }
}
