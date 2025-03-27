"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "../component/ui/card";
import { Button } from "../component/button";
import { CheckCircle } from "lucide-react";
import { Progress } from "../component/ui/progress"; 

export default function ConfirmationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    const token = searchParams.get("token"); 
    console.log("token", token);

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

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#FBF8FC]">
            <Card className="w-full max-w-xl p-8 text-center shadow-lg rounded-lg bg-white space-y-6">
                {loading && <Progress />} 

                <div className="flex pt-10 justify-center">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    You Have Been Resubscribed Successfully!
                </h1>
                <p className="text-gray-600 pb-10">
                    We're thrilled to have you back! Get ready to receive personalized nutrition tips,
                    AI-powered meal plans, and daily health insights straight to your inbox.
                </p>
            </Card>
        </main>
    );
}
