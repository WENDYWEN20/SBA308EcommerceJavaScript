
const mainEl = document.querySelector("main");
mainEl.style.backgroundColor='var(--main-bg)'
mainEl.innerHTML='<h1>E-commerce</h1>'
mainEl.style.textAlign='center'

mainEl.setAttribute('class','flex-ctr')



const topMenuEl=document.getElementById("top-menu");
//Q2.Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height="100%"

topMenuEl.style.backgroundColor='var(--top-menu-bg)'

topMenuEl.setAttribute('class','flex-around')

const subMenuEl=document.getElementById("sub-menu")
subMenuEl.style.height="100%"
subMenuEl.style.backgroundColor='var(--sub-menu-bg)'
subMenuEl.setAttribute('class','flex-around')
subMenuEl.style.position='absolute'
subMenuEl.style.top=0

//Part 4: Update menuLinks
var menuLinks = [
  {text: 'about', href: '#', 
    subLinks: [
    {text: 'Affiliate', href: './affiliate.html'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]
  }
,
  {text: 'catalog', href: '#', 
    subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]
},
  {text: 'orders', href: '#' , 
    subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]
},
  {text: 'account', href: '#', 
    subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'create account', href: '/account/create'},
    {text: 'sign out', href: '/account/signout'},
  ]
},
];
//adding the menuLink to the navBar

menuLinks.forEach((link)=>{
      const a=document.createElement('a')
      a.setAttribute('href', link.href)
      a.textContent=link.text
      topMenuEl.appendChild(a)
  });

// Grabbing all topMenuEl <a> elements
const topMenuLinks = document.querySelectorAll("a");
//Add EventListener
//Attach a delegated 'click' event listener to topMenuEl.
//The first line of code of the event listener function should call the event object's preventDefault() method.

topMenuEl.addEventListener("click", function (e) {
  e.preventDefault();
  //The second line of code of the function should immediately return if the element clicked was not an <a> element.
  if (!e.target.matches("a")) {
    return;
  }

  //Log the content of the <a> to verify the handler is working.
  console.log(e.target.textContent);


  //The event listener should add the active class to the <a> element that was clicked, unless it was already active, in which case it should remove it.
  e.target.classList.toggle("active");
  //The event listener should remove the active class from each other <a> element in topMenuLinks - whether the active class exists or not.
  topMenuLinks.forEach((link) => {
    if (link !== e.target) {
      link.classList.remove("active");
    }
  });
  //===Part 5 - Adding Submenu Interaction===
  //Within the event listener, if the clicked <a> element does not yet have a class of "active" (it was inactive when clicked):
  //If the clicked <a> element's "link" object within menuLinks has a subLinks property (all do, except for the "link" object for ABOUT), set the CSS top property of subMenuEl to 100%.
  //Otherwise, set the CSS top property of subMenuEl to 0.
  //Hint: Caching the "link" object will come in handy for passing its subLinks array later.
  const clickedLink = menuLinks.find(
    (link) => link.text === e.target.textContent
  );
  if (e.target.classList.contains("active") && clickedLink.subLinks) {
    subMenuEl.style.top = "100%";
    buildSubMenu(clickedLink.subLinks);
  } else {
    if (!clickedLink.subLinks) {
      subMenuEl.style.top = 0;
    }
  }

  function buildSubMenu(subLinks) {
    //Clear the current contents of subMenuEl.
    subMenuEl.innerHTML = "";
    //Iterate over the subLinks array, passed as an argument, and for each "link" object:
    subLinks.forEach((link) => {
      //Create an <a> element.
      const a = document.createElement("a");
      //Add an href attribute to the <a>, with the value set by the href property of the "link" object.
      a.setAttribute("href", link.href);
      //Set the element's content to the value of the text property of the "link" object.
      a.textContent = link.text;
      //Append the new element to the subMenuEl.
      subMenuEl.appendChild(a);
    });
  }
});

//Attach a delegated 'click' event listener to subMenuEl.
subMenuEl.addEventListener('click', e=>{

  console.log('event')
})
// The first line of code of the event listener function should call the event object's preventDefault() method.
// The second line of code within the function should immediately return if the element clicked was not an <a> element.
// Log the content of the <a> to verify the handler is working.
// Next, the event listener should set the CSS top property of subMenuEl to 0.
// Remove the active class from each <a> element in topMenuLinks.
// Update the contents of mainEl, within an <h1>, to the contents of the <a> element clicked within subMenuEl.
// If the ABOUT link is clicked, an <h1>About</h1> should be displayed.


import * as Carousel from "./Carousel.js";

const productBrand = document.getElementById("productSelect");

const getFavouritesBtn = document.getElementById("getFavouritesBtn");


document.addEventListener('DOMcontentLoaded', initialLoad())
async function initialLoad(){
    const res= await fetch('https://fakestoreapi.com/products')
    const data=await res.json()
    console.log(data)

    data.forEach((obj) => {
        const option=document.createElement('option')
        option.textContent=obj.title;
        option.setAttribute('value', obj.id);
        productBrand.appendChild(option);
        console.log(option)
    })
    productSelect();
}

productBrand.addEventListener('change', productSelect());
async function productSelect() {

   const res = await fetch(`https://fakestoreapi.com/products`)

   const productData = await res.json();

   //clear the carousle if it has pervious images
   if (document.getElementById('carouselInner').firstChild){
    Carousel.clear()
   }

   //create and append images to carousel
    productData.forEach((item) => { 
    const element=Carousel.createCarouselItem(item.image, item.price, item.title, item.description)
    Carousel.appendCarousel(element)

   })

Carousel.start()    
}

getFavouritesBtn.addEventListener('click', getFavourites);

function getFavourites() {
    axios.get("https://fakestoreapi.com/products")
    .then(res => {
        console.log('All FAVS::: ', res.data);
        Carousel.clear();

        res.data.forEach(item => {
            const element = Carousel.createCarouselItem(item.image, item.price, item.title, item.description)

            Carousel.appendCarousel(element);
        });
    })
    Carousel.start();
}


export async function favourite(c) {
 
  axios.get("https://fakestoreapi.com/products").then((res) => {
    console.log("FAVS => ", res.data);

    let deleted = false;

    // loop over the items
    res.data.forEach((item) => {
      // if the image is favourited then delete
      if (item.title === imgTitle) {
          console.log(item.title);
          
        // delete
        deleted = true;
        axios.delete(`https://fakestoreapi.com/products/${item.title}`)
        .then(res => console.log(res))
      }
    });

    if (!deleted) {
      // add
      axios
        .post("https://fakestoreapi.com/products", { image_id: imgId, sub_id: 'abe' })
        .then((res) => console.log(res.data));
    }
  });
}



