import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { loggedInUser } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg">
        <CardHeader className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={loggedInUser?.avatar_img}
              alt={loggedInUser?.Username}
            />
            <AvatarFallback>{loggedInUser?.Username?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-3xl font-bold">
              {loggedInUser?.First_name} {loggedInUser?.Last_name}
            </CardTitle>
            <p className="text-muted-foreground">{loggedInUser?.Email}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <p className="text-lg">
            <strong>Nickname:</strong> {loggedInUser?.Username}
          </p>
          <p className="text-lg">
            <strong>Phone number:</strong> {loggedInUser?.Phone_number}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
