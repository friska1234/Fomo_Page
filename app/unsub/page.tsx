"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "../component/ui/card";
import { Button } from "../component/button";
import { Progress } from "../component/ui/progress";

export default function UnsubscribePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const token = searchParams.get("token");
    console.log("token", token);

    // Fetch user data from localStorage
    useEffect(() => {
        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo) {
            setUserData(JSON.parse(storedUserInfo));
        }
    }, []);

    // Handle browser back button navigation
    useEffect(() => {
        const handleBackNavigation = () => {
            expireTokenAndRedirect();
        };

        history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", handleBackNavigation);

        return () => window.removeEventListener("popstate", handleBackNavigation);
    }, []);

    const expireTokenAndRedirect = async () => {
        if (!token) {
            console.error("No token found!");
            router.replace("/contact");
            return;
        }

        try {
            setLoading(true);

            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const requestOptions: RequestInit = {
                method: "POST",
                headers: myHeaders,
                redirect: "follow",
            };

            const response = await fetch("https://friskaaiapi.azurewebsites.net/token/expire", requestOptions);
            if (!response.ok) throw new Error("Failed to expire token");

            console.log("Token expired successfully");
        } catch (error) {
            console.error("Error expiring token:", error);
        } finally {
            setLoading(false);
            router.replace("/contact");
        }
    };

    const handleResubscribe = async () => {
        if (!userData) {
            alert("User data not found. Please try again.");
            return;
        }

        try {
            setLoading(true);

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const payload = JSON.stringify({
                PatientName: userData.PatientName,
                Email: userData.Email,
                Age: userData.Age,
                Gender: userData.Gender,
                MedicalConditionName: userData.MedicalConditionName || "None",
            });

            const response = await fetch("https://friskaaiapi.azurewebsites.net/user/insert", {
                method: "POST",
                headers: myHeaders,
                body: payload,
                redirect: "follow",
            });

            if (!response.ok) throw new Error("Resubscription failed");

            console.log("Resubscribed successfully");
            router.replace("/sub");
        } catch (error) {
            console.error("Error resubscribing:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#FBF8FC]">
            <Card className="w-full max-w-xl p-8 text-center shadow-lg rounded-lg bg-white space-y-6">
                {loading && <Progress />} {/* Show loading bar when processing */}

                <h1 className="text-2xl pt-10 font-semibold text-gray-900">
                    You’re Unsubscribed, But We’ll Miss You!
                </h1>
                <p className="text-gray-600">
                    Thank you for letting us be a part of your wellness journey.
                    We’re always here if you decide to come back!
                </p>
                <Button
                    onClick={handleResubscribe}
                    className="mt-6 px-6 py-2 bg-[#783894] text-white font-medium rounded-full hover:bg-purple-700 transition"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Resubscribe"}
                </Button>
                <div className="pb-6"></div>
            </Card>
        </main>
    );
}
