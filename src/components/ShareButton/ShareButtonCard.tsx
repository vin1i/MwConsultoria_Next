import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "next-share";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const ShareButtonCard = ({ id, title, description, image }: ShareButtonProps) => {
  const frontendUrl = `https://mwconsultoriaimobiliaria.com.br/imoveis/${id}/`;

  const socialButtons = [
    {
      Component: WhatsappShareButton,
      Icon: WhatsappIcon,
      name: "WhatsApp",
      props: { url: frontendUrl },
      bgHover: "hover:bg-[#25D366]",
    },
    {
      Component: FacebookShareButton,
      Icon: FacebookIcon,
      name: "Facebook",
      props: { url: frontendUrl, quote: title },
      bgHover: "hover:bg-[#1877F2]",
    },
    {
      Component: TwitterShareButton,
      Icon: TwitterIcon,
      name: "Twitter",
      props: { url: frontendUrl, title },
      bgHover: "hover:bg-[#1DA1F2]",
    },
    {
      Component: LinkedinShareButton,
      Icon: LinkedinIcon,
      name: "LinkedIn",
      props: { url: frontendUrl, title, summary: description, source: frontendUrl },
      bgHover: "hover:bg-[#0A66C2]",
    },
  ];

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
    
        </Button>
      </DialogTrigger>

      <DialogContent isOpen={isOpen} onClose={handleClose} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Compartilhar
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 p-6">
          {socialButtons.map(({ Component, Icon, name, props, bgHover }) => (
            <div key={name} className="flex flex-col items-center">
              <Component
                {...props}
                className={`rounded-full p-2 transition-all duration-300 
                  transform hover:scale-110 hover:shadow-lg ${bgHover} 
                  group cursor-pointer`}
              >
                <Icon size={48} round />
              </Component>
              <span className="mt-2 text-sm font-medium text-gray-600">{name}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
