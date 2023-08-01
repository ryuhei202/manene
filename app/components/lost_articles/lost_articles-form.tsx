import { Box, Button, TextField, Typography } from "@mui/material";

type TProps = {
  memberId?: number;
  message?: string;
  onChangeSetMemberId: () => void;
  onChangeSetMessage: () => void;
  onClickOpenLostArticlesFetcherVisible: () => void;
};

export default function LostArticlesForm({
  memberId,
  message,
  onChangeSetMemberId,
  onChangeSetMessage,
  onClickOpenLostArticlesFetcherVisible,
}: TProps) {
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        height={"100vh"}
        justifyContent={"space-between"}
      >
        <Box
          width={"90%"}
          display={"flex"}
          flexDirection={"column"}
          margin={"5%"}
        >
          <Typography marginBottom={"5%"}>パートナーID</Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="number"
            onChange={onChangeSetMemberId}
            value={memberId ?? ""}
            fullWidth={true}
          ></TextField>
        </Box>
        <Box
          width={"90%"}
          display={"flex"}
          flexDirection={"column"}
          margin={"5%"}
        >
          <Typography marginBottom={"5%"}>伝言メモ</Typography>
          <TextField
            id="outlined-multiline-flexible"
            variant="outlined"
            onChange={onChangeSetMessage}
            value={message ?? ""}
            fullWidth={true}
            multiline
            rows={5}
          ></TextField>
        </Box>
        <Box flexGrow={1}></Box>
        <Box
          width={"95%"}
          display={"flex"}
          flexDirection={"column"}
          marginTop={"auto"}
          marginBottom={"10%"}
        >
          <Button
            onClick={onClickOpenLostArticlesFetcherVisible}
            variant="contained"
          >
            登録する
          </Button>
        </Box>
      </Box>
    </>
  );
}
