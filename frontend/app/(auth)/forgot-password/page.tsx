import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ForgotPage = () => {
    return (
        <>
            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>
            <form>
                <div className="grid items-center w-full gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input name="email" type="email" id="email" />
                    </div>
                    <div className="flex items-center justify-end mt-4 space-x-2">
                        <Button>Email Password Reset Link</Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ForgotPage;
