import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4 border-border">
        <CardContent className="pt-6 text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h1 className="text-2xl font-black text-foreground">404</h1>
          <p className="text-muted-foreground">
            الصفحة غير موجودة / Page not found
          </p>
          <Link href="/prayer-times">
            <Button className="rounded-xl font-bold" data-testid="link-home">
              العودة للرئيسية / Go Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
