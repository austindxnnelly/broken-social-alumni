
function reassign(points) {
    if(points >= 1 && points < 2){
        return "As good as Central Libraries Wifi";
    }else if(points >= 2 && points < 4){
        return "A+";
    }else if(points >= 4 && points < 5){
        return "XOXO Gossip Girl";
    }else if(points >= 5 && points < 8){
        return "Excellence Endorsed";
    }else if(points > 10){
        return "Gold Star";
    }
    return "zero";
}

module.exports = { reassign };
/*
function reassign(points) {
    if(points >= 5 && points < 10){
        return "As good as Central Libraries Wifi";
    }else if(points >= 10 && points < 30){
        return "A+";
    }else if(points >= 30 && points < 50){
        return "XOXO Gossip Girl";
    }else if(points >= 50 && points < 75){
        return "Excellence Endorsed";
    }else if(points > 100){
        return "Gold Star";
    } else {
        return "No"
    }

}*/