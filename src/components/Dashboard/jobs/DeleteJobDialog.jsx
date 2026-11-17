"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteJob } from "@/lib/actions/jobs";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteJobDialog({ job }) {
  //
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await deleteJob(job._id);

      if (!response) {
        toast.error("Job Delete failed!");
        return;
      }

      toast.success(response?.message || "Job Deleted successfully!");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="destructive" className={"cursor-pointer"}>
            <Trash2Icon />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-[oklch(0.704_0.191_22.216)]/20 text-[oklch(0.704_0.191_22.216)]">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete {job.title} ?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this chat conversation. View delete any
            memories saved during this chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" className={"cursor-pointer"}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            variant="destructive"
            className={"cursor-pointer"}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
