var budget_btn=document.getElementById("budget-btn");
var budget=document.getElementById("budget");
var t_budget=document.getElementById("total-budget");
var product_btn=document.getElementById("product-btn");
var title=document.getElementById("title");
var cost=document.getElementById("cost");
var expense_list=document.getElementById("expence-list");
var expense=document.getElementById("expense");
var balance=document.getElementById("balance");


budget_btn.onclick= function(e){
    e.preventDefault();
    if(budget.value!=""){
        localStorage.setItem("budget",budget.value);
        location.href=location.href;
    }
    else{
        alert("Budget is empty");
    }
}
//stora product details

product_btn.onclick=function(e){
    e.preventDefault();
    if(title.value!="" && cost.value!=""){
        var p_title=title.value;
        var p_cost=cost.value;
        var data={p_cost:p_cost, p_title:p_title};
        var string=JSON.stringify(data);
        localStorage.setItem("budget_"+title.value,string);
        location.href=location.href;
    }
    else{
        alert("field is empty");
    }
}


// retrive data from local storage
function all_data(){
    var i;
    for(i=0;i<localStorage.length;i++){
        var all_keys=localStorage.key(i);
        if(all_keys.match("budget_")){
            var json_data = localStorage.getItem(all_keys);
            var json_p= JSON.parse(json_data);
            expense_list.innerHTML+='<div class="row mt-3 mb-3 b-border"><div class="col-md-6 mt-3 d-flex justify-content-between"><h5>'+json_p.p_title+'</h5><h5 class="price">'+json_p.p_cost+'</h5></div><div class="col-md-6 mt-3 d-flex justify-content-end"><i class="fa fa-edit edit-btn" ></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-trash delete-btn" ></i></div></div>';
            
        }

    }
    var price_tag=document.getElementsByClassName("price");
    var price=[];
    for(i=0;i<price_tag.length;i++){
        price[i]=price_tag[i].innerHTML;
    }

    var price_int=[];
    for(i=0;i<price.length;i++){
        price_int.push(parseInt(price[i]));
    }

    var final_price=0;
    for(i=0;i<price_int.length;i++){
        final_price+=price_int[i];
    }
    expense.innerHTML=final_price;
    t_budget.innerHTML=localStorage.getItem("budget");
    var t_bgt=t_budget.innerHTML;
    var t_expense=expense.innerHTML;
    balance.innerHTML=t_bgt-t_expense;

    // to delete data
    var delete_btn=document.getElementsByClassName("delete-btn");
    for(i=0;i<delete_btn.length;i++){
        delete_btn[i].onclick=function(){
            var confirm=window.confirm("Do you want to delete this product?");
            if(confirm){
                var del_parent=this.parentElement;
            var div_parent=del_parent.parentElement;
            var h5=div_parent.firstChild.childNodes[0].innerHTML;
            localStorage.removeItem("budget_"+h5);
            location.href=location.href;
            }
            else{
                alert("Your product info is safe.");
            }

        }
    }

    //to edit data
    var edit_btn=document.getElementsByClassName("edit-btn");
    for(i=0;i<edit_btn.length;i++){
        edit_btn[i].onclick=function(){
            var confirm=window.confirm("Do ou want to edit the product details?");
            if(confirm==true){
                var edit_parent=this.parentElement;
                var col_parent=edit_parent.parentElement;

                var h5_data=col_parent.firstChild.childNodes[0].innerHTML;
                var h5_price=col_parent.firstChild.childNodes[1].innerHTML;

                title.value=h5_data;
                cost.value=h5_price;
                title.focus();
                product_btn.innerHTML="Update data";
                product_btn.style.background="red";
                product_btn.onclick=function(){
                    localStorage.removeItem("budget_"+h5_data);
                    var p_title=title.value;
                    var p_cost=cost.value;
                    var data={p_cost:p_cost, p_title:p_title};
                    var string=JSON.stringify(data);
                    localStorage.setItem("budget_"+title.value,string);
                    location.href=location.href;
                }
            }
            else{
                alert("your data is safe");
            }
        }
    }
    
    
}
all_data();