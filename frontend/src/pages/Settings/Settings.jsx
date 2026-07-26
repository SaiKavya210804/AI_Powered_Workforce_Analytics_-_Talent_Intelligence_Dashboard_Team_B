import "./Settings.css";

import {
    Card,
    CardContent,
    Typography,
    Switch,
    FormControlLabel,
    Button,
    Divider,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel
} from "@mui/material";

import { useState, useEffect } from "react";

function Settings() {

    const [notifications, setNotifications] = useState(true);
    const [theme, setTheme] = useState("light");
    const [aiMode, setAiMode] = useState("detailed");

    // Load saved settings when page opens
    useEffect(() => {

        const savedSettings = localStorage.getItem("workforceSettings");

        if (savedSettings) {

            const settings = JSON.parse(savedSettings);

            setNotifications(settings.notifications);
            setTheme(settings.theme);
            setAiMode(settings.aiMode);

        }

    }, []);

    // Save settings
    const handleSave = () => {

        const settings = {
            notifications,
            theme,
            aiMode
        };

        localStorage.setItem(
            "workforceSettings",
            JSON.stringify(settings)
        );

        alert("Settings saved successfully!");

    };

    // Reset settings
    const handleReset = () => {

        setNotifications(true);
        setTheme("light");
        setAiMode("detailed");

        localStorage.removeItem("workforceSettings");

        alert("Settings reset successfully!");

    };

    return (

        <div className="settings-container">

            <Typography
                variant="h4"
                className="settings-title"
            >
                Settings
            </Typography>

            <Typography
                className="settings-subtitle"
            >
                Configure your AI Assistant preferences.
            </Typography>

            <Card className="settings-card">

                <CardContent>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={notifications}
                                onChange={(e) =>
                                    setNotifications(e.target.checked)
                                }
                            />
                        }
                        label="Enable Notifications"
                    />

                    <Divider sx={{ marginY: 3 }} />

                    <FormControl>

                        <FormLabel>Theme</FormLabel>

                        <RadioGroup
                            value={theme}
                            onChange={(e) =>
                                setTheme(e.target.value)
                            }
                        >

                            <FormControlLabel
                                value="light"
                                control={<Radio />}
                                label="Light"
                            />

                            <FormControlLabel
                                value="dark"
                                control={<Radio />}
                                label="Dark"
                            />

                        </RadioGroup>

                    </FormControl>

                    <Divider sx={{ marginY: 3 }} />

                    <FormControl>

                        <FormLabel>AI Response Style</FormLabel>

                        <RadioGroup
                            value={aiMode}
                            onChange={(e) =>
                                setAiMode(e.target.value)
                            }
                        >

                            <FormControlLabel
                                value="detailed"
                                control={<Radio />}
                                label="Detailed"
                            />

                            <FormControlLabel
                                value="concise"
                                control={<Radio />}
                                label="Concise"
                            />

                        </RadioGroup>

                    </FormControl>

                    <Divider sx={{ marginY: 3 }} />

                    <Typography variant="subtitle1">
                        Project
                    </Typography>

                    <Typography color="text.secondary">
                        AI-Powered Workforce Analytics &
                        Talent Intelligence Dashboard
                    </Typography>

                    <div
                        style={{
                            marginTop: "30px",
                            display: "flex",
                            gap: "15px"
                        }}
                    >

                        <Button
                            variant="contained"
                            onClick={handleSave}
                        >
                            Save Settings
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>

                    </div>

                </CardContent>

            </Card>

        </div>

    );

}

export default Settings;