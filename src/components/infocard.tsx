import React from 'react';
import logo from '../logo.svg';
import '../style/infocard.css';
import Typography from '@material-ui/core/Typography';
function InfoCard (props: any) {
    const { title } = props;
    return (
        <div className="Info-card">
            <div className="Card-title">
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </div>
            <div className="Card-data">
                <div className={"numero"}>
                    <Typography variant="h4" gutterBottom>
                        {"0"}
                    </Typography>
                </div>
                <div className={"subti"}>
                    <Typography variant="subtitle2" gutterBottom>
                        {"Total"}
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default InfoCard;