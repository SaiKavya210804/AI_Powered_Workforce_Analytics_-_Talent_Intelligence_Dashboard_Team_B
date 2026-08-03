import "./ReportCard.css";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";

function ReportCard({
  title,
  description,
  onGenerate,
  onPDF,
  onExcel
}) {
  return (
    <Card className="report-card">
      <CardContent>

        <Typography
          variant="h6"
          className="report-title"
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          className="report-description"
        >
          {description}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3 }}
        >

          <Button
            variant="contained"
            startIcon={<DescriptionIcon />}
            onClick={() => onGenerate(title)}
          >
            Generate
          </Button>

          <Button
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            onClick={() => onPDF(title)}
          >
            PDF
          </Button>

          <Button
            variant="outlined"
            startIcon={<TableChartIcon />}
            onClick={() => onExcel(title)}
          >
            Excel
          </Button>

        </Stack>
      </CardContent>
    </Card>
  );
}

export default ReportCard;