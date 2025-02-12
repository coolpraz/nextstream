import { signOut } from "@/auth";

const LogoutButton = () => {
    console.log("server")
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <button type="submit">Sign Out</button>
        </form>
    );
};

export default LogoutButton;
