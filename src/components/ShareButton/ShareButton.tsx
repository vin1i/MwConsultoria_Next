import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";

interface ShareButtonProps {
  id: string;
  image: string;
}

export const ShareButton = ({ id, image }: ShareButtonProps) => {
  const timestamp = new Date().getTime();
  const frontendUrl = `https://mwconsultoriaimobiliaria.com.br/imoveis/${id}/?cachebuster=${timestamp}`;

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 hover:bg-[#9C192B] hover:text-white transition-colors duration-200 rounded-[25px]"
        >
          <Share2 className="w-4 h-4" />
          Compartilhar
        </Button>
      </DialogTrigger>

      <DialogContent isOpen={isOpen} onClose={handleClose} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Compartilhar
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 p-6">
          {/* WhatsApp */}
          <WhatsappShareButton url={frontendUrl}>
            <WhatsappIcon size={48} round />
          </WhatsappShareButton>

          {/* Facebook */}
          <FacebookShareButton url={frontendUrl}>
            <FacebookIcon size={48} round />
          </FacebookShareButton>

          {/* Twitter */}
          <TwitterShareButton url={frontendUrl}>
            <TwitterIcon size={48} round />
          </TwitterShareButton>

          {/* LinkedIn */}
          <LinkedinShareButton url={frontendUrl}>
            <LinkedinIcon size={48} round />
          </LinkedinShareButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
