class Loc{
	static domin;
	static tank="tank/"
	static js=Loc.tank+"js/";
	static page=Loc.js+"pages/";
	static url;
}
class Ele{
	static create(d){
		try{
			if(typeof d.e=='string'){//create element
				d.e=document.createElement(d.e);
				if(typeof d.t=='string')//content
					d.e.textContent=d.t;
				if(typeof d.h=='string')//html
					d.e.innerHTML=d.h;
				if(typeof d.a=='object'){//attribute
					let k=Object.keys(d.a);
					for(let i=k.length-1;i>=0;i--)
						d.e.setAttribute(k[i],d.a[k[i]]);
				}
			}
			if(typeof d.c=='object'){//child
				let l=d.c.length;
				for(let i=0;i<l;i++){
					d.e.appendChild(Ele.create(d.c[i]));
				}
			}
			return d.e;
		}catch(e){console.log('The element was not created('+e+').');}
	}
	static delete(e){
		try{
			while(e.firstChild)
				Ele.delete(e.firstChild);
			e.remove();
		}catch(e){console.log('The element was not deleted('+e+').');}
	}

	static addJSfile(js){
		let x=document.head.querySelectorAll("SCRIPT");
		for(let i=x.length-1;i>=0;i--)
			if( x[i].hasAttribute("src") && x[i].getAttribute("src")==js )
				return;
		document.head.appendChild(Ele.create({e:"SCRIPT",a:{type:"text/javascript",src:js}}));
	}
}
class Anchor{
	static block(e){
		let a=e.querySelectorAll("A");
		for(let i=a.length-1;i>=0;i--)
			a[i].setAttribute("onclick","return false;");
	}
	static mining(l){
		if(l.indexOf("?")<0)
			return {page:"home",lang:"en","#":""};
		l=l.split("?")[1].split("#");
		l[0]=l[0].split("&");
		let r={};
		for(let i=l[0].length-1;i>=0;i--){
			let k=l[0][i].split("=");
			if(k.length!=2){
				alert("Error: link");
				return;
			}
			r[k[0]]=k[1];
		}
		r["#"]=typeof l[1]!="undefined"?l[1]:"";
		if(typeof r["home"]=="undefined")
			r.home="page";
		if(typeof r["lang"]=="undefined")
			r.lang="en";
		return r;
	}
}
class Server{
	static async ajax(a){
		let req={method:"GET",headers:new Headers()};
		req.headers.append("Content-Type","application/json");
		const response=await fetch(a,req);
		const data=await response.json();
		return data;
	}
}

// page{
class Err{
	constructor(){

	}
}
class Home{
	constructor(){}
}
// }

new class{
	constructor(){
		window.addEventListener("load",async (e)=>{
			Loc.domin=window.location.href;
			Loc.url=Anchor.mining(Loc.domin);
			if(Loc.domin.indexOf("?")>=0)
				Loc.domin=Loc.domin.split("?")[0];
			//Ele.addJSfile(Loc.page+Loc.url["page"]+".js");
			const data=await Server.ajax(Loc.domin+"db/test.json");
			console.log(data.moji);
		});
	}
}