import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Homepage_picture from '../../assets/TimeTuna_logo.png';
import { Grid, Paper} from '@mui/material';

function HomePageGrid(){
    return(
        <div style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)),url(./src/assets/xd.png)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
        <Grid container spacing = {0} sx ={{alignItems: 'center', justifyContent: 'center'}}>
                <Grid item xs={12} sm ={6} md = {6} sx={{ display: { xs: 'none', sm: 'none', md: 'block' }  }}>
                    <Paper sx = {{p: 5, boxShadow: 'none', backgroundColor: 'rgba(255,255,255,0.0)'}}>
                         <img src={Homepage_picture} width = "600"></img>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm = {10} md = {6}>
                    <Paper sx={{boxShadow: '0', backgroundColor: 'rgba(15,130,148,0)'}}>
                        <p></p>
                        <Typography variant="h5" align = "center" sx = {{color: "white"}}>{"🌟 Why Choose TimeTuna? 🌟"}</Typography><br></br>
                        <Typography variant="body1" sx = {{color: "white"}}>
                        {"1️⃣ Simplicity at Its Best: Our user-friendly interface makes scheduling a breeze. Create events, set reminders, and manage your day, week, or month in a few clicks"}<p></p>
                        {"2️⃣ Collaborate Like a Pro: Invite others to your events effortlessly. Whether it's a business meeting or a family get-together, coordinating has never been easier."}<p></p>
                        {"3️⃣ Cross-Platform Accessibility: Access your schedule from any device, anywhere. Your data is securely stored and synchronized in real-time."}<p></p>
                        {"4️⃣ Customization: Tailor your calendar to fit your style. Choose from various themes, view options, and notification settings."}<p></p>
                        {"5️⃣ Privacy Guaranteed: Your data is encrypted and secure. Share what you want, with whom you want."}<p></p>
                        </Typography>
                        <Typography variant="h6" align="center" sx = {{color: "white"}}>{"Click the button below to start planning!"}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant="contained" href="/calendar" sx={{ width: 370, height: 60, backgroundColor: "#F6D58D" }} size="small">START HERE</Button>
                        </Box>                    
                    </Paper>
                </Grid>
            </Grid>
            </div>
    )
}
export default HomePageGrid;
