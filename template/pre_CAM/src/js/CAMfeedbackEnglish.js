const textObjCAMfeedback = {
    CAMfeedback_general: `
   <header>
  <h2>
  Before we continue with the study, we would like you to answer the following questions:
  </h2>
  </header>
  
  <!--possible adjustments: https://stackoverflow.com/questions/3623038/a-likert-scale-in-html -->
  
  <main class="content-horizontal-center content-vertical-center">
  
   <form id="page-form" style="display: block;" autocomplete="off">
  
     <div>
       <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
       To what extent do you feel that the <i>Cognitive-Affective Map</i> you have just drawn reflects your attitudes and feelings during the Covid-19 pandemic? 
       </p>
       
       <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
       </p>
       <div class="w-xl">
       <table class="page-item-table">
         <colgroup>
           <col style="width: 0%">
           <col style="width: 14%">
           <col style="width: 14%">
           <col style="width: 14%">
           <col style="width: 14%">
           <col style="width: 14%">
           <col style="width: 14%">
           <col style="width: 14%">
         </colgroup>
         
         <thead class="sticky-top">
           <tr><th class="sticky-top"></th>
             <th class="sticky-top text-center small">
               <div class="tinytextlabels">completely unrepresentative</div>
               
             </th>
             <th class="sticky-top text-center small">
               <div class="tinytextlabels">moderately unrepresentative</div>
               
             </th>
             <th class="sticky-top text-center small">
               <div class="tinytextlabels">a little unrepresentative</div>
               
             </th>
             <th class="sticky-top text-center small">
               <div class="tinytextlabels">neither unrepresentative nor representative</div>
               
             </th>
             <th class="sticky-top text-center small">
               <div class="tinytextlabels">a little representative</div>
               
             </th>
                      <th class="sticky-top text-center small">
                        <div class="tinytextlabels">moderately representative</div>
               
             </th>
                      <th class="sticky-top text-center small">
                        <div class="tinytextlabels">fully representative</div>
             </th>
           </tr>
         </thead>
       <tbody>
  <!-- likert-scale: 1 question --> 
       <tr>
         <td class="small" style="padding-left: 0">
           
         </td>
         <td class="text-center">
           <label style="height: 100%; padding: 0">
             <input type="radio" name="feedCAM_repres" value="1" required="">
           </label>
         </td>
         <td class="text-center">
           <label style="height: 100%; padding: 10px 0">
             <input type="radio" name="feedCAM_repres" value="2" required="">
           </label>
         </td>
         <td class="text-center">
           <label style="height: 100%; padding: 10px 0">
             <input type="radio" name="feedCAM_repres" value="3" required="">
           </label>
         </td>
         <td class="text-center">
           <label style="height: 100%; padding: 10px 0">
            <input type="radio" name="feedCAM_repres" value="4" required="">
           </label>
         </td>
         <td class="text-center">
           <label style="height: 100%; padding: 10px 0">
             <input type="radio" name="feedCAM_repres" value="5" required="">
           </label>
         </td>
                <td class="text-center">
           <label style="height: 100%; padding: 10px 0">
             <input type="radio" name="feedCAM_repres" value="6" required="">
           </label>
         </td>
                <td class="text-center">
           <label style="height: 100%; padding: 10px 0">
             <input type="radio" name="feedCAM_repres" value="7" required="">
           </label>
         </td>
         </tr>
  <!-- END question block --> 
       </tbody>
       </table>
       </div>
  
       <br>
  
       <div class="w-xl">
  <!-- multiple choice + text field --> 
  <div class="page-item page-item-radio" id="page-item-ques_dummycam">
   <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
   Were there any technical problems in creating the <i>Cognitive-Affective Map</i>? 
   </p>
   <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
   For example, was it not possible to draw a connection or create a new concept.
   </p>
  
   <table class="table-plain page-item-table">
     <colgroup>
       <col style="width: 7.5%">
       <col style="width: 92.5%">
     </colgroup>
  <tbody>
  <!--ans1--> 
  <tr>
   <td>
     <input type="radio" name="feedCAM_technicalprobs" value="0" id="feedCAM_technicalprobs" required="">
   </td>
   <td>
     <label for="feedCAM_technicalprobs" class="text-left">
     No, there were no technical problems. 
     </label>
   </td>
  </tr>
  <!--ans2--> 
  <tr>
   <td>
     <input type="radio" name="feedCAM_technicalprobs" value="1" id="feedCAM_technicalprobs" required="">
   </td>
   <td>
     <label for="feedCAM_technicalprobs" class="text-left">
     Yes, there were technical problems, and these were the following:
     </label>
  <!-- single text --> 
  <div class="page-item page-item-input" id="page-item-feedback_mail">
  <textarea name="feedCAM_technicalprobsText" class="w-100" type="text" rows="1"></textarea>
  </div>
  <!-- END single text --> 
   </td>
  </tr>
  </tbody>
  </table>
  </div>
  <!-- END multiple choice + text field --> 
  
  <br>
  
  <!-- multiple choice + text field --> 
  <div class="page-item page-item-radio" id="page-item-ques_dummycam">
   <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
   Have you stopped drawing your <i>Cognitive-Affective Map</i> for technical reasons? 
   </p>
   <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
   </p>
  
   <table class="table-plain page-item-table">
     <colgroup>
       <col style="width: 7.5%">
       <col style="width: 92.5%">
     </colgroup>
  <tbody>
  <!--ans1--> 
  <tr>
   <td>
     <input type="radio" name="feedCAM_stopdrawing" value="0" id="feedCAM_stopdrawing" required="">
   </td>
   <td>
     <label for="feedCAM_stopdrawing" class="text-left">
     No, I have finished drawing the <i>Cognitive-Affective Map</i>.
     </label>
   </td>
  </tr>
  <!--ans2--> 
  <tr>
   <td>
     <input type="radio" name="feedCAM_stopdrawing" value="1" id="feedCAM_stopdrawing" required="">
   </td>
   <td>
     <label for="feedCAM_stopdrawing" class="text-left">
     Yes, I had to stop drawing the <i>Cognitive-Affective Map</i> before it was finished because:
     </label>
  <!-- single text --> 
  <div class="page-item page-item-input" id="page-item-feedback_mail">
  <textarea name="feedCAM_stopdrawingText" class="w-100" type="text" rows="1"></textarea>
  </div>
  <!-- END single text --> 
   </td>
  </tr>
  </tbody>
  </table>
  </div>
  <!-- END multiple choice + text field --> 
  
  <br>
  
  <!-- multiple choice + text field --> 
  <div class="page-item page-item-radio" id="page-item-ques_dummycam">
   <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
   Have you ever created a <i>Cognitive-Affective Map</i> with the same or similar rules?
    </p>
   <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
   For example, in a previous study.
   </p>
  
   <table class="table-plain page-item-table">
     <colgroup>
       <col style="width: 7.5%">
       <col style="width: 92.5%">
     </colgroup>
  <tbody>
  <!--ans1--> 
  <tr>
   <td>
     <input type="radio" name="feedCAM_already" value="0" id="feedCAM_already" required="">
   </td>
   <td>
     <label for="feedCAM_already" class="text-left">
  No
     </label>
   </td>
  </tr>
  <!--ans2--> 
  <tr>
   <td>
     <input type="radio" name="feedCAM_already" value="1" id="feedCAM_already" required="">
   </td>
   <td>
     <label for="feedCAM_already" class="text-left">
     Not sure
     </label>
   </td>
  </tr>
  <!--ans3--> 
  <tr>
   <td>
     <input type="radio" name="feedCAM_already" value="2" id="feedCAM_already" required="">
   </td>
   <td>
     <label for="feedCAM_already" class="text-left">
     Yes, in the following context:
     </label>
  <!-- single text --> 
  <div class="page-item page-item-input" id="page-item-feedback_mail">
  <textarea name="feedCAM_alreadyText" class="w-100" type="text" rows="1"></textarea>
  
  </div>
  <!-- END single text --> 
   </td>
  </tr>
  </tbody>
  </table>
  </div>
  <!-- END multiple choice + text field --> 
   </form>
  </div> 
  </div>
  </main>
  
  <footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
  Continue &rarr;
  </button>
  </footer>
  `,
    CAMfeedback_central: `
   <header>
  <h2>
  Before we continue with the study, we would like to ask you the following:
  </h2>
  </header> 
  
  
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">
  <form id="page-form" style="display: block;" autocomplete="off">
  
  <!-- single text --> 
  <div class="page-item page-item-input" id="page-item-feedback_mail">
   <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
  What was your most central / your most important node (term) in the Cognitive-Affective Map you have just drawn?
   </p>
   <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
    Please enter only a single word here. If you have several words of equal importance, please write them one after the other.
   </p>
  <input name="ques_mostimpnode" class="w-100" type="text" required>
  </div>
  <!-- END single text --> 
  
  </form>
  </div>
  </main>
  
  
  <footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
   Fortfahren &rarr;
  </button>
  </footer>
  `
  }
  

  
  