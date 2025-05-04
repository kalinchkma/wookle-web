
    import React from "react";
    import { motion } from "framer-motion";
    import { useAuth } from "@/contexts/AuthContext";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    import { useToast } from "@/components/ui/use-toast";

    const ProfilePage = () => {
      const { user, updateUserProfile } = useAuth();
      const { toast } = useToast();
      const [name, setName] = React.useState(user?.name || "");
      const [email, setEmail] = React.useState(user?.email || "");
      const [isEditing, setIsEditing] = React.useState(false);

      const handleSave = () => {
        // In a real app, send update to backend
        updateUserProfile({ name, email });
        toast({ title: "Profile updated successfully!" });
        setIsEditing(false);
      };

      const getInitials = (name) => {
        if (!name) return "U";
        const names = name.split(' ');
        return names.length > 1 
          ? `${names[0][0]}${names[names.length - 1][0]}` 
          : name[0];
      }

      return (
        <div className="container mx-auto px-4 py-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-8"
          >
            My Profile
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={user?.avatar || `https://avatar.vercel.sh/${user?.email}.png`} alt={user?.name} />
                  <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                </Avatar>
                <CardTitle>{user?.name}</CardTitle>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <span className="mt-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 capitalize">
                  {user?.role}
                </span>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isEditing ? (
                  <div className="flex justify-end">
                    <Button onClick={() => setIsEditing(true)} variant="outline">Edit Profile</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button onClick={handleSave} className="bg-shopzone hover:bg-shopzone-dark">Save Changes</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default ProfilePage;
  