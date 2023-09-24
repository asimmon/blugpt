import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, MessageCircle } from "lucide-react";
import { FC } from "react";
import { ChatModel } from "../chat-services/models";

interface Prop {
  chatModel: ChatModel;
  disable: boolean;
  onChatModelChange?: (value: ChatModel) => void;
}

export const ChatModelSelector: FC<Prop> = (props) => {
  return (
    <Tabs
      defaultValue={props.chatModel}
      onValueChange={(value) =>
        props.onChatModelChange
          ? props.onChatModelChange(value as ChatModel)
          : null
      }
    >
      <TabsList className="grid w-full grid-cols-2 h-12 items-stretch">
        <TabsTrigger
          value="gpt-3.5-turbo"
          className="flex gap-2"
          disabled={props.disable}
        >
          <MessageCircle size={20} /> GPT-3.5
        </TabsTrigger>
        <TabsTrigger
          value="gpt-4"
          className="flex gap-2"
          disabled={props.disable}
        >
          <FileText size={20} /> GPT-4
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
