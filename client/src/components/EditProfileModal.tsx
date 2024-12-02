import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Member } from "@/types/departments";
import MemberService from "@/services/member-service";
import { toast } from "sonner";

interface EditProfileModalProps {
  className?: string;
  member: Member;
  onSave: (updatedMember: Member) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  className,
  member,
  onSave,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editedMember, setEditedMember] = useState<Member>({ ...member });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await MemberService.updateMember(editedMember.id, editedMember);
      onSave(editedMember);
      handleClose();
    } catch (error) {
      toast.error("Ошибка при обновлении профиля");
      console.error("Ошибка при обновлении профиля:", error);
    }
  };

  const handleClose = () => {
    setEditedMember({ ...member });
    setIsModalOpen(false);
  };

  return (
    <div className={cn(className)}>
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogTrigger className="bg-red-500 p-2 px-6 text-white rounded-md mt-4">
          Редактировать профиль
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Редактирование профиля</AlertDialogTitle>
            <AlertDialogDescription>
              Измените информацию профиля ниже:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="fullname" className="text-foreground">
                Полное имя
              </Label>
              <Input
                type="text"
                name="fullname"
                id="fullname"
                value={editedMember.fullname}
                onChange={handleInputChange}
                placeholder="Полное имя"
                className="text-foreground"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="age" className="text-foreground">
                Возраст
              </Label>
              <Input
                type="number"
                name="age"
                id="age"
                value={editedMember.age}
                onChange={(e) =>
                  setEditedMember({
                    ...editedMember,
                    age: Number(e.target.value),
                  })
                }
                placeholder="Возраст"
                className="text-foreground"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="role" className="text-foreground">
                Роль
              </Label>
              <Input
                type="text"
                name="role"
                id="role"
                value={editedMember.role}
                onChange={handleInputChange}
                placeholder="Роль"
                className="text-foreground"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="photoURL" className="text-foreground">
                URL фото
              </Label>
              <Input
                type="text"
                name="photoURL"
                id="photoURL"
                value={editedMember.photoURL}
                onChange={handleInputChange}
                placeholder="URL фото"
                className="text-foreground"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={editedMember.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="text-foreground"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="text-foreground"
              onClick={handleClose}
            >
              Отмена
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>
              Сохранить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditProfileModal;
