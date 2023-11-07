import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Sparkles } from "lucide-react";
import { FC } from "react";
import { ChatModel } from "../../chat-services/models";
import { useChatContext } from "../chat-context";

interface Prop {
  disable: boolean;
}

export const ChatModelSelector: FC<Prop> = (props) => {
  const { onChatModelChange, chatBody } = useChatContext();

  return (
    <Tabs
      defaultValue={chatBody.chatModel}
      onValueChange={(value) =>
        onChatModelChange(value as ChatModel)
      }
    >
      <TabsList className="grid w-full grid-cols-2 h-12 items-stretch">
        <TabsTrigger
          value="gpt-3.5"
          className="flex gap-2"
          disabled={props.disable}
        >
          <Zap size={20} /> GPT-3.5
        </TabsTrigger>
        <TabsTrigger
          value="gpt-4"
          className="flex gap-2"
          disabled={props.disable}
        >
          <Sparkles size={20} /> GPT-4
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
