"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showToast } from "@/lib/showToast";

export default function MyAccount() {
  // Router for navigation
  const router = useRouter();
  
  // State for user data
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    favoriteGame: "",
    city: "",
    state: "",
    country: ""
  });
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  
  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user/me");
        if (response.ok) {
          const responseData = await response.json();
          // The actual user data is in the data field
          const userData = responseData.data || responseData;
          setUser(userData);
          // Save email to localStorage for persistence
          if (userData.email) {
            localStorage.setItem("playerEmail", userData.email);
          }
        } else {
          // User not authenticated, redirect to login
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback to localStorage if API fails
        const playerEmail = localStorage.getItem("playerEmail");
        if (!playerEmail) {
          router.push("/login");
        }
      } finally {
        setUserLoading(false);
      }
    };
    
    fetchUser();
  }, [router]);
  
  // Fetch player profile on component mount
  useEffect(() => {
    // Skip if user data is still loading
    if (userLoading) return;
    
    // Get email from user data or fallback to localStorage
    const userEmail = user?.email || localStorage.getItem("playerEmail");
    
    // Pre-fill email if available
    if (userEmail) {
      setFormData(prev => ({ ...prev, email: userEmail }));
    }
    
    // Check if profile exists
    const checkProfile = async () => {
      setIsLoading(true);
      try {
        // Only fetch profile if email exists
        if (userEmail) {
          const response = await fetch(`/api/player?email=${encodeURIComponent(userEmail)}`);
          const data = await response.json();
          
          if (response.ok) {
            setFormData(data);
            setProfileExists(true);
          }
        }
      } catch (error) {
        console.error("Error checking profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkProfile();
  }, [user, userLoading]);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const method = profileExists ? "PUT" : "POST";
      const response = await fetch("/api/player", {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setProfileExists(true);
        setIsEditMode(false);
        // Save email to localStorage for future visits
        localStorage.setItem("playerEmail", formData.email);
        showToast("success", profileExists ? "Profile updated successfully!" : "Profile created successfully!");
      } else {
        // Handle the case where the profile already exists but needs to be updated
        if (data.error && data.error.includes("already exists")) {
          // Update the existing profile instead of showing an error
          const updateResponse = await fetch("/api/player", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          });
          
          const updateData = await updateResponse.json();
          
          if (updateResponse.ok) {
            setProfileExists(true);
            setIsEditMode(false);
            // Save email to localStorage for future visits
            localStorage.setItem("playerEmail", formData.email);
            showToast("success", "Profile updated successfully!");
          } else {
            showToast("error", updateData.error || "Failed to update profile");
          }
        } else {
          showToast("error", data.error || "Failed to save profile");
        }
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      showToast("error", "An error occurred while saving your profile");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  
  // Render loading state
  if (isLoading && !profileExists) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg">Loading your profile...</p>
      </div>
    );
  }
  
  // Render profile creation form or view/edit profile
  return (
    <div className="max-w-lg mx-auto">
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl">{profileExists ? "My Profile" : "Create Your Profile"}</CardTitle>
        </CardHeader>
        <CardContent>
          {!profileExists || isEditMode ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose a username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    readOnly={!!user?.email || !!localStorage.getItem("playerEmail")}
                    className={user?.email || localStorage.getItem("playerEmail") ? "bg-gray-100" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="favoriteGame">Favorite Game</Label>
                  <Input
                    id="favoriteGame"
                    name="favoriteGame"
                    value={formData.favoriteGame}
                    onChange={handleInputChange}
                    placeholder="Your favorite game"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Country"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Saving..." : profileExists ? "Update Profile" : "Create Profile"}
                </Button>
                {profileExists && (
                  <Button type="button" variant="outline" onClick={() => setIsEditMode(false)}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 pb-4 border-b">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{formData.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="font-medium">{formData.username}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{formData.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{new Date(formData.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Favorite Game</p>
                  <p className="font-medium">{formData.favoriteGame}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{formData.city}, {formData.state}, {formData.country}</p>
                </div>
              </div>
              <Button onClick={toggleEditMode} className="w-full">
                Edit Profile
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
