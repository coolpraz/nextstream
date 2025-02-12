"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface SearchDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

const SearchDialog = ({ isOpen, onOpenChange }: SearchDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                        <Search className="w-4 h-4 opacity-50" />
                        <Input
                            id="search"
                            placeholder="Type to search..."
                            className="col-span-3"
                            autoFocus
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SearchDialog;
