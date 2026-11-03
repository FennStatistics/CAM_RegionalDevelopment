const textObjCAMfeedback = {
  CAMfeedback_general: `
 <header>
<h2>
Bevor Sie mit der Studie fortfahren, bitten wir Sie, die folgenden Fragen zu beantworten:
</h2>
</header>

<!--possible adjustments: https://stackoverflow.com/questions/3623038/a-likert-scale-in-html -->

<main class="content-horizontal-center content-vertical-center">

 <form id="page-form" style="display: block;" autocomplete="off">

   <div>
     <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
     Inwieweit denken Sie, dass die von Ihnen soeben gezeichnete <i>Mind-Map</i> Ihre Einstellungen und Gefühle <span style="background-color: yellow; color: red;">während der Covid-19-Pandemie</span>widerspiegelt?
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
       <tr>
       <th class="sticky-top"></th>
       <th class="sticky-top text-center small">
         <div class="tinytextlabels">völlig unrepräsentativ</div>
       </th>
       <th class="sticky-top text-center small">
         <div class="tinytextlabels">etwas unrepräsentativ</div>
       </th>
       <th class="sticky-top text-center small">
         <div class="tinytextlabels">ein wenig unrepräsentativ</div>
       </th>
       <th class="sticky-top text-center small">
         <div class="tinytextlabels">weder unrepräsentativ noch repräsentativ</div>
       </th>
       <th class="sticky-top text-center small">
         <div class="tinytextlabels">ein wenig repräsentativ</div>
       </th>
       <th class="sticky-top text-center small">
         <div class="tinytextlabels">etwas repräsentativ</div>
       </th>
       <th class="sticky-top text-center small">
         <div class="tinytextlabels">völlig repräsentativ</div>
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
 Gab es technische Probleme beim Erstellen der <i>Mind-Map</i>?
 </p>
 <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
 Zum Beispiel war es nicht möglich, eine Verbindung zu zeichnen oder ein neues Konzept zu erstellen.
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
   Nein, es gab keine technischen Probleme.
   </label>
 </td>
</tr>
<!--ans2--> 
<tr>
 <td>
   <input type="radio" name="feedCAM_technicalprobs" value="1" id="feedCAM_technicalprobs2" required="">
 </td>
 <td>
   <label for="feedCAM_technicalprobs2" class="text-left">
   Ja, es gab technische Probleme, und zwar die folgenden:
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
 Haben Sie schon einmal eine <i>Mind-Map</i> mit den gleichen oder ähnlichen Regeln erstellt?
  </p>
 <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
 Zum Beispiel in einer früheren Studie.
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
Nein
   </label>
 </td>
</tr>
<!--ans2--> 
<tr>
 <td>
   <input type="radio" name="feedCAM_already" value="1" id="feedCAM_already2" required="">
 </td>
 <td>
   <label for="feedCAM_already2" class="text-left">
   Nicht sicher
   </label>
 </td>
</tr>
<!--ans3--> 
<tr>
 <td>
   <input type="radio" name="feedCAM_already" value="2" id="feedCAM_already3" required="">
 </td>
 <td>
   <label for="feedCAM_already3" class="text-left">
   Ja, im folgenden Kontext:
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
Weiter &rarr;
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

 const CAMfeedbackGeneral_htmlForm = new lab.html.Form({
     title: "CAMfeedbackGeneral",
     content: textObjCAMfeedback.CAMfeedback_general,
     messageHandlers: {
      run: function anonymous(){
         // progress bar
         document.querySelector(".progress-bar").style.width = (numElementsCounter / numElements) * 100 + "%";
      },
         commit: function anonymous() {
         // progress bar
         numElementsCounter++;
         document.querySelector(".progress-bar").style.width = (numElementsCounter / numElements) * 100 + "%";

             if (typeof jatos.jQuery === "function") {
                 // If JATOS is available, send data there
                 var resultJson = study.options.datastore.exportJson();
                 jatos.submitResultData(resultJson)
                     .then(() => console.log('success'))
                     .catch(() => console.log('error'));
             }
         }
     },
 })



 /* CAM Instruktionen on multiple pages */


 /* CAM Instruktionen on one page
 const CAMfeedback_central_htmlForm = new lab.html.Form({
   title: "CAMinstructions",
   content: textObjInstCAM.CAMinst_onePage,
   messageHandlers: {
     run: function anonymous() {
       document.querySelector('button').style.visibility = 'hidden';
       setTimeout(
         () => document.querySelector('button').style.visibility = 'visible',
         10000 // 60000 (1 minute)
       )
     }
   },
 })
 */