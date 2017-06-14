
function Song( id, title ) {
  this.id = id;
  this.title = title;
}
function Jukebox(){ 
  this.songs = []; 
  this.players = []; 
  this.currentSong = 0;
  this.SC = SC;
  this.SC.initialize({
    client_id: 'TafyfEoJwoQ9VgKceKprmsL86bqynS5G'
  });
}

Jukebox.prototype.addSong = function(){
  for( let i=0; i<arguments.length; i++){
    this.songs.push( arguments[i] );
  }
}

Jukebox.prototype.play = function(){
  console.log( "in play", this );
  const self = this;
  let player = this.players[this.currentSong],
      song = this.songs[this.currentSong];
  document.getElementById("img").style.display = "none";
  document.getElementById("gif").style.display = "initial";

  if( player ) {
    console.log( "player detected" );
    player.play();
    document.getElementById("song").innerText = song.title;

  } else {
    console.log( "no player detected" );

    this.SC.stream('/tracks/'+song.id).then(function(p){
      console.log( "got player", p);
      self.players[self.currentSong] = p;
      console.log( self.players );
      self.play();
      console.log (Song.title);
    });
  }
}

Jukebox.prototype.pause = function(){
  let player = this.players[this.currentSong],
      song = this.songs[this.currentSong];
  player.pause();
  console.log("Pause");
  document.getElementById("img").style.display = "initial";
  document.getElementById("gif").style.display = "none";
}

Jukebox.prototype.stop = function(){
  let player = this.players[this.currentSong],
      song = this.songs[this.currentSong];
  player.pause();
  player.seek(0);
  document.getElementById("img").style.display = "initial";
  document.getElementById("gif").style.display = "none";
}

Jukebox.prototype.forward = function(){
  this.currentSong = (this.currentSong+1)%this.songs.length;
  console.log(this.currentSong);
  const self = this;
  let player = this.players[this.currentSong],
      song = this.songs[this.currentSong];
  if( player ) {
    console.log( "player detected" );
    player.seek(0);
    player.play();

  } else {
    console.log( "no player detected" );

    this.SC.stream('/tracks/'+song.id).then(function(p){
      console.log( "got player", p);
      self.players[self.currentSong] = p;
      console.log( self.players );
      self.play();
      console.log (Song.title);
      document.getElementById("song").innerText = song.title;
      
    });
  }
}

var myJukebox = new Jukebox();
myJukebox.addSong(new Song('45062705', 'Hotel Dennis'), new Song('223228432',"It's strange"), new Song('29366957',"Mac Miller Heat Wave"));

document.addEventListener("DOMContentLoaded",function(){
  document.querySelector('.play').addEventListener('click',function(event){
    myJukebox.play();
  });

  document.querySelector('.pause').addEventListener('click',function(event){
    myJukebox.pause();
  });

  document.querySelector('.stop').addEventListener('click',function(event){
    myJukebox.stop();
  });

  document.querySelector('.next').addEventListener('click',function(event){
    myJukebox.forward();
  });

});
