import { Box, TextField, Typography } from "@mui/material";
import FooterButton from "../common/button/footer-button";

type TProps = {
  memberId?: number;
  message?: string;
  onChangeMemberId: (numberId?: number) => void;
  onChangeMessage: (message: string) => void;
  onClickOpenLostArticlesFetcherVisible: () => void;
};

export default function LostArticlesForm({
  memberId,
  message,
  onChangeMemberId,
  onChangeMessage,
  onClickOpenLostArticlesFetcherVisible,
}: TProps) {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="100vh"
        justifyContent="space-between"
      >
        <Box width="90%" display="flex" flexDirection="column" margin="5%">
          <Typography marginBottom="5%">パートナーID</Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="number"
            onChange={(e) => {
              const memberId = parseInt(e.target.value);
              onChangeMemberId(isNaN(memberId) ? undefined : memberId);
            }}
            value={memberId ?? ""}
            fullWidth
          />
        </Box>
        <Box width="90%" display="flex" flexDirection="column" margin="5%">
          <Typography marginBottom="5%">伝言メモ</Typography>
          <TextField
            id="outlined-multiline-flexible"
            variant="outlined"
            onChange={(e) => {
              onChangeMessage(e.target.value);
            }}
            value={message ?? ""}
            fullWidth
            multiline
            rows={5}
          />
        </Box>
        <Box flexGrow={1}></Box>
        <FooterButton
          onClick={onClickOpenLostArticlesFetcherVisible}
          disabled={!memberId || !message}
        >
          登録する
        </FooterButton>
      </Box>
    </>
  );
}
