"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "../component/ui/card";
import { Button } from "../component/button";
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
        <main className="min-h-screen flex bg-[#FBF8FC] items-center justify-center">
            <Card className="w-full max-w-xl space-y-8 p-8 text-center shadow-lg rounded-lg bg-white">
                {loading && <Progress />} 

                <h1 className="text-2xl font-semibold pt-10 text-gray-900">
                    You Made The Right Call!
                </h1>
                <p className="text-gray-600 mt-2">
                    Get ready for more expert nutrition tips and smart wellness insights.
                </p>
                <Button
                    onClick={() => router.push("/")}
                    className="mt-6 px-6 py-2 bg-[#783894] text-white font-medium rounded-full hover:bg-purple-700 transition"
                >
                    Back to Home
                </Button>
                <div className="pb-6"></div>
            </Card>
        </main>
    );
}
