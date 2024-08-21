import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const RegisterPage = () => {
    return (
        <form>
            <div className="grid items-center w-full gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input name="name" id="name" autoFocus />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" type="email" id="email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input name="password" type="password" id="password" />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="passwordConfirmation">Confirm Password</Label>
                    <Input name="passwordConfirmation" type="password" id="passwordConfirmation" />
                </div>
                <div className="flex items-center justify-end mt-4 space-x-2">
                    <Link href="/login" className="underline">
                        Already registered?
                    </Link>
                    <Button>Register</Button>
                </div>
            </div>
        </form>
    );
};

export default RegisterPage;
