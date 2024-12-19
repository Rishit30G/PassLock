import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import InputDemo from "./PasswordInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPasswordsSchema } from "@/lib/zodSchema/schemas";
import { useForm } from "react-hook-form";
import { Copy, Loader2, Trash2 } from "lucide-react";
import {
  createDetails,
  deleteDetails,
  updateDetails,
} from "@/actions/password.action";
import { toast } from "sonner";
import InputBox from "@/components/InputBox";

interface DialogComponentProps {
  children: React.ReactNode;
  text: string;
  userId: string;
  accountId: string;
  item?: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccessfulOperation?: () => void;
}

const DialogComponent = ({
  children,
  text,
  userId,
  accountId,
  item,
  isOpen,
  onOpenChange,
  onSuccessfulOperation,
}: DialogComponentProps) => {
  const [monkeyState, setMonkeyState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Reset monkey state when dialog opens/closes
  useEffect(() => {
    setMonkeyState(false);
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof addPasswordsSchema>>({
    resolver: zodResolver(addPasswordsSchema),
    defaultValues: {
      orgName: item?.orgName || "",
      orgUrl: item?.orgUrl || "",
      username: item?.userName || "",
      password: item?.password || "",
    },
  });

  useEffect(() => {
    reset({
      orgName: item?.orgName || "",
      orgUrl: item?.orgUrl || "",
      username: item?.userName || "",
      password: item?.password || "",
    });
  }, [item, isOpen, reset]);

  async function onSubmit(values: z.infer<typeof addPasswordsSchema>) {
    setLoading(true);
    try {
      let result;
      if (item?.$id) {
        result = await updateDetails(item.$id, values);
        toast.success(result.message || "Details updated successfully");
      } else {
        result = await createDetails(values, userId, accountId);
        toast.success(result.message || "Details created successfully");
      }
      onOpenChange(false);
      onSuccessfulOperation && onSuccessfulOperation();
    } catch (error) {
      toast.error("Details failed to save");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(itemID: string) {
    try {
      await deleteDetails(itemID);
      toast.success("Details deleted successfully");
      onOpenChange(false);
      onSuccessfulOperation && onSuccessfulOperation();
    } catch (error) {
      toast.error(error?.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
  }

  const handleCopy = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      toast.success("Copied!");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px] p-6">
        <DialogHeader>
          <DialogTitle>{text}</DialogTitle>
          <DialogDescription className="flex justify-center">
            {monkeyState ? (
              <Image
                src="/see_no_evil.png"
                alt="Hidden"
                className="object-contain py-3 transition-transform scale-90 ease-in-out"

                width={80}
                height={80}
              />
            ) : (
              <Image
                src="/monkey_face.png"
                alt="Visible"
                className="object-contain py-3 cursor-pointer hover:animate-shake"
                width={80}
                height={80}
              />
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <InputBox register={{...register("orgName")}} placeholder="Organization Name" value={watch("orgName")} />
            {errors.orgName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.orgName.message}
              </p>
            )}

          <InputBox register={{...register("orgUrl")}} placeholder="Organization URL" value={watch("orgUrl")} />
            {errors.orgUrl && (
              <p className="text-red-500 text-sm mt-2">
                {errors.orgUrl.message}
              </p>
            )}

          <InputBox register={{...register("username")}} placeholder="Username" value={watch("username")} />
            {errors.username && (
              <p className="text-red-500 text-sm mt-2">
                {errors.username.message}
              </p>
            )}

          <InputDemo setMonkeyState={setMonkeyState} register={{...register("password")}} placeholder="Password" />
          {errors.password && (
            <p className="text-red-500 text-sm !mt-2">
              {errors.password.message}
            </p>
          )}

          <DialogFooter className="flex justify-end gap-2">
            {text === "Edit details" && (
              <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the item. 🥹
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                      variant="destructive"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(item.$id);
                      }}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button
              className={`w-20 flex items-center ${loading && "text-gray-400"}`}
              disabled={loading || !isDirty}
              type="submit"
            >
              Save
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
