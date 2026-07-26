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

function ReportCard({ title, description }) {
  return (
    <Card className="report-card">
      <CardContent>

        <Typography variant="h6" className="report-title">
          {title}
        </Typography>

        <Typography variant="body2" className="report-description">
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
          >
            Generate
          </Button>

          <Button
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
          >
            PDF
          </Button>

          <Button
            variant="outlined"
            startIcon={<TableChartIcon />}
          >
            Excel
          </Button>

        </Stack>

      </CardContent>
    </Card>
  );
}

export default ReportCard;