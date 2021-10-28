mapboxgl.accessToken = mapBoxToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: camp.geometry.coordinates,
    zoom: 10

});

const marker1 = new mapboxgl.Marker()
.setLngLat(camp.geometry.coordinates)
.addTo(map);




// <!-- 
// <% layout('layouts/boilerplate')%>
// <link rel="stylesheet" href="../../public/stylesheets/stars.css">
// <script src="https://api.mapbox.com/mapbox-gl-js/v2.5.1/mapbox-gl.js"></script>


// <body>

// <script> 
// const mapBoxToken = '<%-process.env.MAPBOX_TOKEN %>'
// const camp = <%- JSON.stringify(camp) %>

// </script>
    
// <div class="row">
//     <div class="col-6">
//         <div id="campgroundCarousel" class="carousel slide mb-2" data-bs-ride="carousel">
//             <div class="carousel-inner">
//             <% camp.images.forEach((img, i) => { %> 
//               <div class="carousel-item <%= i === 0 ? 'active' : "" %>">
//                 <img src="<%= img.url %>" class="d-block w-100 h-75" alt="">
//               </div>
//               <% }) %> 
//               <div class="carousel-item">
//                 <img src="..." class="d-block w-100" alt="">
//               </div>
//               <div class="carousel-item">
//                 <img src="..." class="d-block w-100" alt="...">
//               </div>
//               <% if (camp.images.length > 1) { %> 
//             </div>
//             <button class="carousel-control-prev" type="button" data-bs-target="#campgroundCarousel" data-bs-slide="prev">
//               <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//               <span class="visually-hidden">Previous</span>
//             </button>
//             <button class="carousel-control-next" type="button" data-bs-target="#campgroundCarousel" data-bs-slide="next">
//               <span class="carousel-control-next-icon" aria-hidden="true"></span>
//               <span class="visually-hidden">Next</span>
//             </button>
//         </div>
//           <% }   %> 

//         <div id="map" style="width: 400px; height: 300px"></div>
//         <div class="card mt-2 mb-2">
            
//             <div class="card-body">
//                 <h5 class="card-title"><%= camp.title%></h5>
//                 <p class="card-text"><%= camp.description%></p>
//             </div>
//             <ul class="list-group list-group-flush">
//                 <li class="list-group-item text-muted"><%= camp.location%></li>
//                 <li class="list-group-item">Submitted by: <b><%= (camp.author[0]) ? (camp.author[0].username) : 'Unknown Author' %></b></li>
//                 <li class="list-group-item">$<%= camp.price%>/night</li>
//             </ul>
//             <%  if( currentUser && camp.author[0] && (camp.author[0]._id.toString() === currentUser._id.toString()))  { %>
//             <div class="card-body">
//                 <a class="card-link btn btn-info" href="/campgrounds/<%=camp._id%>/edit">Edit</a>
//                 <form class="d-inline" action="/campgrounds/<%=camp._id%>?_method=DELETE" method="POST">
//                     <button class="btn btn-danger">Delete</button>
//                 </form>
//             </div>
//             <% } %>
//             <div class="card-footer text-muted">
//                 2 days ago
//             </div>
//         </div>
//     </div>
//     <div class="col-6">
//         <% if(currentUser){ %>
//             <h2>Leave a Review</h2>
//             <form action="/campgrounds/<%=camp._id%>/reviews" method="POST" class="mb-3 validated-form" novalidate>
//                 <!-- <div class="mb-3">
//                     <label class="form-label" for="rating">Rating</label>
//                     <input class="form-range" type="range" min="1" max="5" name="review[rating]" id="rating">
//                 </div> -->
//                 <!-- <fieldset class="starability-basic">
//                     <input type="radio" id="no-rate" class="input-no-rate" name="review[rating]" value="1" checked
//                         aria-label="No rating." />
//                     <input type="radio" id="first-rate1" name="review[rating]" value="1" />
//                     <label for="first-rate1" title="Terrible">1 star</label>
//                     <input type="radio" id="first-rate2" name="review[rating]" value="2" />
//                     <label for="first-rate2" title="Not good">2 stars</label>
//                     <input type="radio" id="first-rate3" name="review[rating]" value="3" />
//                     <label for="first-rate3" title="Average">3 stars</label>
//                     <input type="radio" id="first-rate4" name="review[rating]" value="4" />
//                     <label for="first-rate4" title="Very good">4 stars</label>
//                     <input type="radio" id="first-rate5" name="review[rating]" value="5" />
//                     <label for="first-rate5" title="Amazing">5 stars</label>
//                 </fieldset>
//                 <div class="mb-3">
//                     <label class="form-label" for="body">Review Text</label>
//                     <textarea class="form-control" name="review[body]" id="body" cols="30" rows="3" required></textarea>
//                     <div class="valid-feedback">
//                         Looks good!
//                     </div>
//                 </div>
//                 <button class="btn btn-success">Submit</button>
//             </form>
//             <% } %>
//             <% for(let review of camp.reviews) { %>
//                 <div class="card mb-3 ">
//                     <div class="card-body">
//                         <h5 class="card-title"> <%= review.author.username%></h5>
//                         <p class="starability-result" data-rating="<%=review.rating%>">
//                             Rated: <%= review.rating %> stars
//                         </p>
//                         <h6 class="card-subtitle mb-2 text-muted">By <%= review.author.username%></h6>
//                         <p class="card-text">Review: <%= review.body %></p>
//                          <!-- <%  if( currentUser && (review.author[0]._id.toString() == currentUser._id.toString()))  {%>
//                          <form action="/campgrounds/<%=camp._id%>/reviews/<%=review._id%>?_method=DELETE" method="POST">
//                             <button class="btn btn-sm btn-danger">Delete</button>
//                      </form>
//         <% } %>
//                     </div>
//                 </div>
//                 <% } %>
//         </div>
//     </div>

// <script src="/javascripts/showPageMap.js" class="mr-3"></script>

// </body> --> --> -->
