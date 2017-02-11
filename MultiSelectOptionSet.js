<html><head>
<title></title>
<script src="../WebResources/new_jquery3.1.1.min.js" type="text/javascript"></script>
<script type="text/javascript">

        // function will be called when web resource is loaded on Form.
        $(document).ready(function () 
        {
            ConvertDropDownToCheckBoxList();
        });

        //Coverts option list to checkbox list.
function ConvertDropDownToCheckBoxList() 
{
    var dropdownOptions = parent.Xrm.Page.getAttribute("OptionSetFieldOntheForm").getOptions();
    var selectedValue = parent.Xrm.Page.getAttribute("ValueFieldForTheOptionSet").getValue();

    $(dropdownOptions).each(function (i, e) 
    {
        var rText = $(this)[0].text;
        var rvalue = $(this)[0].value;
        var isChecked = false;
        if (rText != '') 
        {
            if (selectedValue != null && selectedValue.indexOf(rvalue) != -1)
                isChecked = true;
            var checkbox = "<label><input type=\"checkbox\"  name =\"r\">" + rText  + "<br></label>"
            $(checkbox)
                .attr("value", rvalue)
                .attr("id", "id" + rvalue)
                .attr("checked", isChecked)
                .on('click', function () 
                {
                    //To Set Option Set Values to the related field
                    var selectedOption = parent.Xrm.Page.getAttribute("ValueFieldForTheOptionSet").getValue();
                    if ($(this).find('input').is(':checked')) 
                    {
                        if (selectedOption == null)
                            selectedOption = rvalue+"";
                        else
                            selectedOption = selectedOption + "," + rvalue
                    }
                    else //Removes the value from the field if it is unchecked
                    {
                        var tempSelected = rvalue + ",";
                        if (selectedOption != null) 
                        {
                            if (selectedOption.indexOf(tempSelected) != -1)
                                selectedOption = selectedOption.replace(tempSelected, "");
                            else
                                selectedOption = selectedOption.replace(rvalue, "")
                        }
                    }
                    parent.Xrm.Page.getAttribute("l1s_trainingmodulesvalues").setValue(selectedOption);

                    //To Set Option Set Select Text to the related field
                    var selectedYear = parent.Xrm.Page.getAttribute("l1s_trainingmodules").getValue();
                    if ($(this).find('input').is(':checked')) 
                    {
                        if (selectedYear == null)
                            selectedYear = rText+"";
                        else
                            selectedYear = selectedYear + "," + rText
                    }
                    else //Removes the value from the field if it is unchecked
                    {
                        var tempSelectedtext = rText + ",";
                        if (selectedYear != null) 
                        {
                            if (selectedYear.indexOf(tempSelectedtext) != -1)
                                selectedYear = selectedYear.replace(tempSelectedtext, "");
                            else
                                selectedYear = selectedYear.replace(rText, "");
                        }
                    }
                    parent.Xrm.Page.getAttribute("l1s_trainingmodules").setValue(selectedYear);

                })
                .appendTo(checkboxList);
        }
    });
}
</script>  
<meta charset="utf-8"></head><body style="word-wrap: break-word;"><div id="checkboxList">
</div>
</body></html>