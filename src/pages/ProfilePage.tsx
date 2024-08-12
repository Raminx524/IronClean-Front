import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone } from "lucide-react";

export default function Profile() {
  const { loggedInUser } = useAuth();
  console.log(loggedInUser);
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="shadow-xl">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage
                src={loggedInUser?.avatar_img}
                alt={loggedInUser?.Username}
              />
              <AvatarFallback className="text-4xl">
                {loggedInUser?.Username?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left space-y-2">
              <CardTitle className="text-3xl font-bold">
                {loggedInUser?.First_name} {loggedInUser?.Last_name}
              </CardTitle>
              <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-4 h-4" />
                {loggedInUser?.Email}
              </p>
              {loggedInUser?.role && (
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
                  <Badge variant="secondary">{loggedInUser.role}</Badge>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <Separator />
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{loggedInUser?.Phone_number}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{loggedInUser?.Email}</span>
            </p>
          </div>
          {loggedInUser?.Username && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Username</h3>
              <Separator />
              <p>{loggedInUser.Username}</p>
            </div>
          )}
          {loggedInUser?.Price && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Hourly Rate</h3>
              <Separator />
              <p>${loggedInUser.Price}/hour</p>
            </div>
          )}
          {loggedInUser?.Text && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Summary</h3>
              <Separator />
              <p className="text-muted-foreground">{loggedInUser.Summary}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
