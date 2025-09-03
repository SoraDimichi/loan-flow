import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormContext } from "@/components/form-context";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SuccessDialog({ open, onClose }: SuccessDialogProps) {
  const { formData } = useFormContext();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Application Submitted Successfully!</DialogTitle>
          <DialogDescription>
            {`Congratulations, ${formData.lastName} ${formData.firstName}. You
            have been approved for ${formData.amount}$ for a period of
            ${formData.term} days.`}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-center">
          <Button onClick={onClose}>Start New Application</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
