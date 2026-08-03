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
  onExcel,
  reportGenerated
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
          marginTop={3}
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
            disabled={!reportGenerated}
          >
            PDF
          </Button>

          <Button
            variant="outlined"
            startIcon={<TableChartIcon />}
            onClick={() => onExcel(title)}
            disabled={!reportGenerated}
          >
            Excel
          </Button>

        </Stack>

      </CardContent>
    </Card>
  );
}

export default ReportCard;