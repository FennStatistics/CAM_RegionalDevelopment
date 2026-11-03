const textObj = {
  // ! german
  socioDemo: `
  <header>
    <h2>
    Bitte beantworten Sie die folgenden Fragen zu Ihrer Person:
    </h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify" style="display: block">
    
    <p class="text-center">Bevor die Studie endet, würden wir Sie bitten noch ein paar Informationen zu Ihrer Person anzugeben. </p>
    
    <form id="demography">
      <table>
        <!-- Age -->
        <tr style="height: 50px">
          <td class="font-weight-bold text-left">
        Wie alt sind Sie (in Jahren)?
          </td>
          <td>
            <input name="sociodemo_age" type="number" required class="w-100">
          </td>
        </tr>
        
        <!-- Gender identity, following Tate et al. (2013) -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
          Was ist Ihre derzeitige Geschlechtsidentität?
          </td>
          <td>
            <select name="sociodemo_gender" required class="w-100">
              <option value="" selected>
              -- Bitte auswählen --
              </option>
              <option value="female">weiblich</option>
              <option value="male">männlich</option>
              <option value="intersex">nicht-binär</option>
              <option value="none">Ich möchte es nicht nennen.</option>
            </select>
          </td>
        </tr>
      
        <!-- Education -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
          Bitte geben Sie Ihren höchsten Bildungsabschluss an:
          </td>
          <td>
            <select name="sociodemo_education" required class="w-100">
              <option value="" selected>
                -- Bitte auswählen --
              </option>
              <option value="no">Kein Abschluss</option>
              <option value="highschool">Schulabschluss</option>
              <option value="bachelor">Bachelorabschluss</option>
              <option value="master">Masterabschluss</option>
              <option value="phd">PhD</option>
            </select>
          </td>
        </tr>

        <!-- Occupation   -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
          Welchen Beruf üben Sie aus, oder wenn Sie noch studieren, welches Fachgebiet studieren Sie? 
          </td>
          <td>
            <input name="sociodemo_occupation" required class="w-100">
          </td>
        </tr>

        <!-- Semester studiert -->
        <tr style="height: 50px">
          <td class="font-weight-bold text-left">
        Wie viele Semester haben Sie bereits studiert?
          </td>
          <td>
            <input name="sociodemo_numsemester" type="number" required class="w-100">
          </td>
        </tr>
 
        <!-- Column balance -->
        <colgroup>
          <col style="width: 45%">
          <col style="width: 55%">
        </colgroup>
      </table>
      </form>
  </div>
</main>

  
  <footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify">
  </div>
  <button id="continue" type="submit" form="demography">
  Fortfahren &rarr;
</button>

</footer>
  `,
  feedbackQues: `
  <header>
    <h2>
    Wenn Sie möchten, beantworten Sie bitte diese letzte Frage:
    </h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center" >
  <div class="w-l">
    <form id="page-form" style="display: block;" autocomplete="off">
<!-- multiline text text --> 
<div class="page-item page-item-textarea" id="page-item-feedback_critic">
  <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
  Haben Sie Feedback oder Kritik an der Online-Studie?
  </p>
  <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
  Jegliche Kritik oder Verbesserungsvorschläge helfen uns sehr, zukünftige Studien zu verbessern.
  </p>
  <textarea name="feedback_critic" class="w-100" rows="4"></textarea>
</div>
<!-- END multiline text --> 
     
    </form>
  </div> 
</main>
  
  <footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
  Continue &rarr;
</button>
</footer>
  `,
}


