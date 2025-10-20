// Format currency values
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
}

// Format dates
export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Calculate win rate percentage
export function calculateWinRate(wins, total) {
  if (total === 0) return 0;
  return ((wins / total) * 100).toFixed(1);
}

// Get status badge color based on tournament status
export function getStatusColor(status) {
  switch (status) {
    case 'upcoming':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'live':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'completed':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

// Get transaction type color
export function getTransactionColor(type) {
  switch (type) {
    case 'Tournament Win':
    case 'Bonus':
    case 'Deposit':
      return 'text-green-600';
    case 'Withdrawal':
    case 'Tournament Entry Fee':
      return 'text-red-500';
    default:
      return 'text-gray-600';
  }
}

// Calculate XP progress percentage
export function calculateXpProgress(currentXp, xpToNextLevel) {
  return Math.min((currentXp / xpToNextLevel) * 100, 100);
}

// Truncate text with ellipsis
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Generate random ID
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

// Filter tournaments by status
export function filterTournamentsByStatus(tournaments, status) {
  if (!status) return tournaments;
  return tournaments.filter(tournament => tournament.status === status);
}

// Sort tournaments by date
export function sortTournamentsByDate(tournaments, ascending = false) {
  return [...tournaments].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

// Get tournament registration status
export function getRegistrationStatus(tournament, registeredTournaments) {
  const isRegistered = registeredTournaments.some(t => t.id === tournament.id);
  const isFull = tournament.currentPlayers >= tournament.maxPlayers;
  const isPast = new Date(tournament.date) < new Date();

  return {
    isRegistered,
    isFull,
    isPast,
    canRegister: !isRegistered && !isFull && !isPast
  };
}
