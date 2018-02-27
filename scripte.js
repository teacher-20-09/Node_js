window.onload=function(){
	GetFile();
	getajax.onclick=function(){
		var xhr=new XMLHttpRequest();
		var str='username='+username.value+'&'+'password='+password.value;
		// xhr.open('get', '/getajax?'+str, true);
		var obj={
			"username":username.value,
			"password":password.value
		};
		var obj1=JSON.stringify(obj);
		xhr.open('post', '/postajax', true);
		// xhr.send();
		xhr.setRequestHeader('Content-Type', 'application/json')
		xhr.send(obj1);
		xhr.onreadystatechange=function(){
		if(xhr.readyState!==4) return
		if(xhr.status!==200)
			console.log(xhr.status+':'+xhr.status.Text)
		else
			console.log(xhr.responseText);
		respons.innerHTML=xhr.responseText;
	}

	}
	
	getfile.onclick=GetFile;
	

	function GetFile(){

		var xhr=new XMLHttpRequest();
		xhr.open('get', '/getfile', true);
		xhr.send();

		xhr.onreadystatechange=function(){
		if(xhr.readyState!==4) return
		
		if(xhr.status!==200)
			console.log(xhr.status+':'+xhr.status.Text)
		else{
			var data=xhr.responseText;
			data=JSON.parse(data);
			filedata.innerHTML='';
			console.log(data.length);
			console.log(data[1]);
			// var ul=document.createElement('ul');
			// ul.setAttribute('id', 'dataUl')
			// filedata.appendChild(ul);
			// for(var i=0; i<data.length; i++){
			// 	var li=document.createElement('li');
				
			// 	ul.appendChild(li);
			// 	li.innerHTML=data[i].first+' '+data[i].last+' : '+data[i].age;
				var table=document.createElement('table');
				filedata.appendChild(table);
				for(var i=0;i<data.length;i++){
					var tr=document.createElement('tr');
					table.appendChild(tr);
					// console.log(data[i].length);
					for(var key in data[i]){
						var td=document.createElement('td');
//						console.log(data[i][key])
						td.innerHTML=data[i][key];
						tr.appendChild(td);
					}
					var td=document.createElement('td');
					tr.appendChild(td);
					var btn=document.createElement('input');
					btn.setAttribute('type', 'button');
					btn.setAttribute('value', 'Delete');
					btn.classList.add('delete');
					td.appendChild(btn)
				}

				table.onclick=function(event){
					var target=event.target;
					
					if(target.tagName!=='INPUT') return;
					console.log(event.target);

					var tr=target.parentNode.parentNode;
//					alert(tr.rowIndex)
				var xhr=new XMLHttpRequest();
				var obj1=JSON.stringify({
					index:tr.rowIndex
				});
				xhr.open('post', '/rowindex', true);
				xhr.setRequestHeader('Content-type', 'application/json');
				xhr.send(obj1);

				xhr.onreadystatechange=function(){
					if (xhr.readyState !==4) return;
					if (xhr.status!==200)
						console.log(xhr.status+':'+xhr.statusText);
					else{
						console.log(xhr.responseText);
					GetFile();
					}
				}
				}

				
			// }
			// filedata.innerHTML=data;
		}
		}
	}

	postajax2.onclick=function(){
		console.log('hello');
		var xhr=new XMLHttpRequest();
		var obj=JSON.stringify({
			first:first.value,
			last:last.value,
			age:age.value
		})
		xhr.open('post', '/adduser', true);
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.send(obj);
		console.log(obj)

		xhr.onreadystatechange=function(){
		if(xhr.readyState!==4) return
		
		if(xhr.status!==200)
			console.log(xhr.status+':'+xhr.status.Text)
		else{

			console.log(xhr.responseText);
			GetFile();

			}
		}
		
	}
	
}
