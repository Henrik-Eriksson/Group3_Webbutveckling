import ResponsiveAppBar from '../components/ResponsiveAppBar.jsx';
import HomePageGrid from '../components/HomePageGrid.jsx';

function HomePage(){
    return(
        <div>
            <ResponsiveAppBar/>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56 }}
            />
        </div>
    )
}
export default HomePage;
