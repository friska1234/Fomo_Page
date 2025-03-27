"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Heart, Brain, Utensils, Sparkles } from "lucide-react";
import { Card } from "./component/ui/card";
import { Button } from "./component/button";
import { Progress } from "./component/ui/progress";  

export default function Home() {
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true); 
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("https://friskaaiapi.azurewebsites.net/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (data.PatientName) {
          setUserName(data.PatientName);
          localStorage.setItem("userInfo", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // ✅ Stop loading once data is fetched
      }
    };

    fetchUserData();
  }, [token]);

  const handleUnsubscribe = async () => {
    try {
      setLoading(true);  

      const storedUserInfo = localStorage.getItem("userInfo");
      const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
      const email = parsedUserInfo?.Email;

      if (!email) {
        alert("No email found. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await fetch(`https://friskaaiapi.azurewebsites.net/user/remove?email=${email}`, {
        method: "DELETE",
        redirect: "follow",
      });

      if (!response.ok) throw new Error("Failed to unsubscribe");

      console.log("Unsubscribed successfully");
      router.push("/unsub");
    } catch (error) {
      console.error("Error unsubscribing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="max-w-3xl w-full md:w-2/3 p-8 space-y-8 bg-white rounded-lg shadow-lg">
        {loading && <Progress />}  

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Wait, {userName}!
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800">
            Are You Sure You Want To Miss Out?
          </h2>
        </div>

        <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80"
            alt="Healthy Food"
            className="object-cover w-full"
          />
        </div>

        <h3 className="text-xl font-medium text-center text-gray-700">
          By Unsubscribing, You&apos;ll Lose Access To
        </h3>

        <div className="grid gap-6">
          <Feature icon={Heart} color="red" title="Expert Nutrition Tips" description="Science-backed advice from top nutritionists to help you make smarter dietary choices" />
          <Feature icon={Brain} color="blue" title="AI-Powered Meal Plans" description="Personalized meal recommendations tailored just for you" />
          <Feature icon={Utensils} color="orange" title="Superfood of the Day" description="Daily AI-curated superfood picks to boost your health" />
          <Feature icon={Sparkles} color="purple" title="Smart Health Insights" description="Cutting-edge, AI-driven tips to keep you at your best" />
        </div>

        <div className="text-center space-y-6 pt-4">
          <p className="text-gray-600">
            Stay ahead in your health journey with AI-powered guidance! If there&apos;s anything we can improve, let us know, we&apos;d love to make it better for you. Still want to leave? Click below, but we&apos;d hate to see you go!
          </p>

          <div className="space-y-4 flex flex-col items-center justify-center">
            <Button className="w-full max-w-md font-bold rounded-full py-4 bg-purple-600 hover:bg-purple-700">
              Keep my Subscription
            </Button>
            <button
              onClick={handleUnsubscribe}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
              disabled={loading}  
            >
              {loading ? "Processing..." : "Unsubscribe"}
            </button>
          </div>
        </div>
      </Card>
    </main>
  );
}

function Feature({ icon: Icon, color, title, description }: { icon: any; color: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className={`p-3 bg-${color}-100 rounded-lg`}>
        <Icon className={`w-6 h-6 text-${color}-500`} />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
