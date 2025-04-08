import React, { useState } from "react";
import { useChat } from "@ai-sdk/react";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import Send from "@material-ui/icons/Send";
import { 
  Button, 
  TextField, 
  MenuItem, 
  Select, 
  FormControl,
  InputLabel,
  Paper,
  Typography,
  Divider,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#fff"
  },
  sidebar: {
    width: 256,
    borderRight: `1px solid ${theme.palette.divider}`,
    display: "flex",
    flexDirection: "column"
  },
  sidebarHeader: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  newChatButton: {
    width: "100%",
    justifyContent: "center"
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
    fontSize: 16
  },
  historyContainer: {
    flexGrow: 1,
    overflowY: "auto",
    padding: theme.spacing(1)
  },
  historyTitle: {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
  },
  chatItem: {
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
    fontSize: "0.875rem",
    "&:hover": {
      backgroundColor: theme.palette.action.hover
    }
  },
  activeChatItem: {
    backgroundColor: theme.palette.action.selected,
  },
  chatItemTitle: {
    fontWeight: 500
  },
  chatItemDate: {
    fontSize: "0.75rem",
    color: theme.palette.text.secondary
  },
  chatContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },
  chatHeader: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    justifyContent: "flex-end"
  },
  modelSelect: {
    width: 200
  },
  messagesContainer: {
    flexGrow: 1,
    overflowY: "auto",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2)
  },
  emptyState: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: theme.palette.text.disabled
  },
  messageWrapper: {
    display: "flex"
  },
  userMessageWrapper: {
    justifyContent: "flex-end"
  },
  assistantMessageWrapper: {
    justifyContent: "flex-start"
  },
  messageBubble: {
    padding: theme.spacing(1.5),
    maxWidth: "80%",
    borderRadius: theme.shape.borderRadius
  },
  userMessage: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  assistantMessage: {
    backgroundColor: theme.palette.action.hover
  },
  inputContainer: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    display: "flex",
    gap: theme.spacing(1)
  },
  messageInput: {
    flexGrow: 1
  }
}));

interface ChatHistory {
  id: string;
  title: string;
  date: Date;
}

export default function ChatPage() {
  const classes = useStyles();
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([
    { id: "1", title: "Project Discussion", date: new Date(2025, 3, 8, 10, 30) },
    { id: "2", title: "Customer Support", date: new Date(2025, 3, 7, 14, 15) },
    { id: "3", title: "Feature Planning", date: new Date(2025, 3, 6, 9, 0) },
  ]);
  const [activeChat, setActiveChat] = useState<string | null>("1");

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: {
      model: selectedModel,
    },
  });

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: `New Chat ${chatHistories.length + 1}`,
      date: new Date(),
    };
    setChatHistories([newChat, ...chatHistories]);
    setActiveChat(newChat.id);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleModelChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedModel(event.target.value as string);
  };

  const handleMessageSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit(event);
  };

  return (
    <div className={classes.root}>
      {/* Left sidebar with chat history */}
      <div className={classes.sidebar}>
        <div className={classes.sidebarHeader}>
          <Button 
            variant="outlined" 
            className={classes.newChatButton} 
            onClick={createNewChat}
          >
            <AddCircleOutline className={classes.buttonIcon} />
            Novo Chat
          </Button>
        </div>
        <div className={classes.historyContainer}>
          <Typography className={classes.historyTitle}>
            Histórico de Conversas
          </Typography>
          <div>
            {chatHistories.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`${classes.chatItem} ${activeChat === chat.id ? classes.activeChatItem : ""}`}
              >
                <div className={classes.chatItemTitle}>{chat.title}</div>
                <div className={classes.chatItemDate}>{formatDate(chat.date)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side with chat interface */}
      <div className={classes.chatContainer}>
        <div className={classes.chatHeader}>
          <FormControl variant="outlined" className={classes.modelSelect}>
            <InputLabel id="model-select-label">Selecione o modelo</InputLabel>
            <Select
              labelId="model-select-label"
              value={selectedModel}
              onChange={handleModelChange}
              label="Selecione o modelo"
            >
              <MenuItem value="gpt-4o">GPT-4o</MenuItem>
              <MenuItem value="gpt-4-turbo">GPT-4 Turbo</MenuItem>
              <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={classes.messagesContainer}>
          {messages.length === 0 ? (
            <div className={classes.emptyState}>Inicie uma nova conversa</div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.id} 
                className={`${classes.messageWrapper} ${message.role === "user" ? classes.userMessageWrapper : classes.assistantMessageWrapper}`}
              >
                <Paper 
                  className={`${classes.messageBubble} ${message.role === "user" ? classes.userMessage : classes.assistantMessage}`}
                  elevation={1}
                >
                  {message.content}
                </Paper>
              </div>
            ))
          )}
        </div>

        <div className={classes.inputContainer}>
          <form onSubmit={handleMessageSubmit} style={{ display: "flex", width: "100%", gap: 8 }}>
            <TextField
              value={input}
              onChange={handleInputChange}
              placeholder="Digite sua mensagem..."
              variant="outlined"
              size="small"
              className={classes.messageInput}
              disabled={isLoading}
            />
            <Button 
              type="submit"
              variant="contained" 
              color="primary"
              disabled={isLoading || !input.trim()}
            >
              <Send />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
