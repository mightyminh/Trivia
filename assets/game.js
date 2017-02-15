var questions = [
       [
	  
	   ],
     [["What does Pokémon stand for?", "Poking Mons", "Pocket Monsters", "Pikachu Monster", "Picking Monsters"],"false",2],
	   [["What type is Pikachu?", "Normal", "Fairy", "Electric", "Water"],"false",3],
	   [["What Pokémon is a clone of Mew?", "Mewtwo", "Charizard", "Squirtle", "Mewtwin"],"false",1],
	   [["What are the newest versions of Pokémon?", "Gold/Silver", "X/Y", "Sun/Moon", "Ruby/Sapphire"],"false",3],
	   [["How many Pokémon are there?", "150", "720", "151", "659"],"false",2],
    ],
	to='',
	sec=15,
	A;

//mix up the questions!!
function _(x){return document.getElementById(x);}
function getRandomInt(min,max){return Math.floor(Math.random() * (max - min)) + min;}
function in_array(what,where){for(var i=0; i < where.length; i++)if(what == where[i])return true;return false;}



function ask(){
var len=questions.length;
if(len==1){
var answers=questions[0],
    a_len=answers.length,
	cor=0,
	incor=0,
	msg='';
	
	for(var z=0; z < a_len; z++){
	if(in_array('true',answers[z])){cor++;}
	else{incor++;}
	}
	
msg='You have given '+cor+' correct and '+incor+' incorrect answers for '+a_len+' questions. <br> Thanks for playing the Pokémon Trivia Game! <br /> <br />';
_('test').innerHTML=msg;
if(_('nw').checked){
var win=window.open('','resultWin','width=500,height=500,top=0,left=0,statusbar=no,searchbar=no,titlebar=no,toolbar=no,location=no,scrollbars=no');
win.document.write('<center><div style="padding:150px 50px;">'+msg+'</div><a href="#null" onclick="window.close();">Close</a></center>');
win.focus();
win.moveBy((screen.width-500)/2,(screen.height-500)/3);
}
return;
}
else{
//randomization with some crazy loop i had to look up online. 
var answered=questions[0].length, 
    temp=questions.slice(1),
	total=answered + temp.length,
	index=getRandomInt(0,temp.length),
    Q=A=temp[index],
	Q_answer_index=Q[2], 
	q_text=Q[0][0],
	q_answers=Q[0].slice(1),
	test=_('test'),
	i=0,
	user_input='false';
	

	// use innerHTML to make a container for all the questions and answer choices. 
	test.innerHTML='<div>You have answered '+answered+' questions from '+total+'</div><h3>'+q_text+'</h3><div id="tt"></div>';
	
	for(; i<q_answers.length; i++){
	var val=(i+1==Q_answer_index) ? 'true' : 'false';
	test.innerHTML+='<b>'+(i+1)+'.</b>&nbsp;<input type="radio" name="choices" value="'+val+'" title="'+val+'" />&nbsp;<i>'+q_answers[i]+'</i><br />';
	}
	
	test.innerHTML+='<br /><button>Submit Answer</button>';
	
	var opts=test.querySelectorAll('[type="radio"]'),
	    btn=test.querySelector('button');
	
	for(var k=0; k<opts.length; k++){
	opts[k].onchange=function(){user_input=this.value;}
	}
	
	btn.onclick=function(){
	A[1]=user_input;
	clearTimeout(to);
	answer(index+1);
	}
	
	timer(sec,index+1);
}

}

//set timer function! tick tock tick tock
function timer(val,ind){
var ending=(val > 1) ? 's' : '';
var txt='<b class="r">'+( val>9 ? val : ('0'+val) )+'</b> second'+ending+' left';
if(val > 0){
_('tt').innerHTML=txt;
val--;
to=setTimeout('timer('+val+','+ind+')',1500);
}
else
{
_('tt').innerHTML='Time is up';
clearTimeout(to);
answer(ind);
return;
}
}

function answer(ind){
questions[0].push(A);
questions.splice(ind,1);
setTimeout('ask()',200);
}

onload=ask;