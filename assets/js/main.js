
var articleName = document.getElementById('articleName');
var articleCategory = document.getElementById('articleCategory');
var thumbnail = document.getElementById('thumbnail');
var uploadedThumbnail='';
thumbnail.addEventListener("change",function(){
          var reader=new FileReader();
          reader.addEventListener("load",() => {
            uploadedThumbnail=reader.result;
            console.log(uploadedThumbnail);

          });
          reader.readAsDataURL(this.files[0]);
          
          
        }

        )


var articleTxt = document.getElementById('articleTxt');
var createDate = document.getElementById('createDate');
var addBtn = document.getElementById('addBtn');
var search=document.getElementById('search');
var update=document.getElementById('updateBtn');
update.style.display='none';
var currentIndex=0;



//create Articles
var articles
if (JSON.parse(localStorage.getItem('articles'))===null){
  articles=[];
}else
articles=JSON.parse(localStorage.getItem('articles'))

displayArticles();

addBtn.onclick=function(e){
    e.preventDefault();
    addArticle();
    resetValues();
    displayArticles();
}

function addArticle(){
    var article={
        "articleName" : articleName.value,
        "articleCategory" : articleCategory.value,
        "thumbnail" : uploadedThumbnail,
        "articleTxt" : articleTxt.value,
        "createDate" : createDate.value
        
                  }

    //articles.push(article);
    articles.push(article)
    localStorage.setItem("articles",JSON.stringify(articles))

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
}

function resetValues(){
    articleName.value="";
    articleCategory.value="";
    thumbnail.value="";
    articleTxt.value="";
    createDate.value="";
}


//display articles
function displayArticles(){
    var result=JSON.parse(localStorage.getItem(articles));
    
    
    for(var i=0; i<articles.length; i++){
            result+=`
            <tr>
            <td>${[i]}</td>
            <td>${articles[i].articleName}</td>
            <td>${articles[i].articleCategory}</td>
            <td><img class="blogthumbnail" src="${articles[i].thumbnail}"</td>
            <td>${articles[i].articleTxt}</td>
            <td>${articles[i].createDate}</td>
            <td><button class="btn btn-info" onclick="getArticle(${i})">update</button></td>
            <td><button class="btn btn-danger" onclick="deleteArticle(${i})" >delete</button></td>
            </tr>
            
            
            `


    }

    data.innerHTML = result;
    
}


//delete all btn
document.getElementById('deleteBtn').onclick=function(){
    Swal.fire({
        title: 'هل انت متأكد من قرار بخصوص الحذف الجماعي؟',
        text: "لن تستطيع التراجع عن هذه الخطوة",
        icon: 'تحذير هام',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'نعم انا متأكد من الحذف!'
      }).then((result) => {
        if (result.isConfirmed) {

            articles=[];
            localStorage.setItem("articles",JSON.stringify(articles));

            data.innerHTML='';


          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
   
}


//deleteArticle
function deleteArticle(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            articles.splice(index,1);
            localStorage.setItem("articles",JSON.stringify(articles));

            displayArticles();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
 
    
}




//search box
search.onkeyup= function (){
    var result=``
    for(var i=0;i<articles.length;i++){
        if (articles[i].articleName.toLowerCase().includes(search.value.toLowerCase())){

            result=`
            <tr>
            <td>${[i]}</td>
            <td>${articles[i].articleName}</td>
            <td>${articles[i].articleCategory}</td>
            <td>${articles[i].thumbnail}</td>
            <td>${articles[i].articleTxt}</td>
            <td>${articles[i].createDate}</td>
            <td><button class="btn btn-info">update</button></td>
            <td><button class="btn btn-danger" onclick="deleteArticle(${i})" >delete</button></td>
            </tr>
            
            `
        }
        data.innerHTML=result;
    }
}


//update

function getArticle(index){
 
 var article=articles[index]
 articleName.value=article.articleName
 articleCategory.value=article.articleCategory
 articleTxt.value=article.articleTxt
 thumbnail.value=article.thumbnail
 createDate.value=article.createDate

 update.style.display = 'inline'
 addBtn.style.display = 'none'
 currentIndex=index
}

update.onclick = function(e){
  e.preventDefault();
  addBtn.style.display='inline';
  update.style.display='none';
  updateArticle()
  localStorage.setItem("articles",JSON.stringify(articles));

  resetValues();
  displayArticles();
 
Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your Updates has been saved',
    showConfirmButton: false,
    timer: 1500
  })

}


function updateArticle(){
  var article={
    articleName:articleName.value,
    articleCategory:articleCategory.value,
    thumbnail:thumbnail.value,
    createDate:createDate.value,
    articletxt:articleTxt.value
    }
    articles[currentIndex].articleName=article.articleName;
    articles[currentIndex].articleCategory=article.articleCategory;
    articles[currentIndex].articleTxt=article.articleTxt;
    articles[currentIndex].createDate=article.createDate;
    articles[currentIndex].thumbnail=article.thumbnail;

}

