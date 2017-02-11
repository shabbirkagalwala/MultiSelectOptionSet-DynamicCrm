<html><head>
<title></title>
<script src="../WebResources/new_jquery3.1.1.min.js" type="text/javascript"></script>
<script type="text/javascript">

        // function will be called when web resource is loaded on Form.
        $(document).ready(function () 
        {
            ConvertOptionSettoCheckBox();
        });

        //Coverts option list to checkbox list.
function ConvertOptionSettoCheckBox() 
{
    var dropdownOptions = parent.Xrm.Page.getAttribute("OptionSetFieldOntheForm").getOptions();
    var OptionSetValue = parent.Xrm.Page.getAttribute("ValueFieldForTheOptionSet").getValue();

    $(dropdownOptions).each(function (i, e) 
    {
        var rText = $(this)[0].text;
        var rvalue = $(this)[0].value;
        var isChecked = false;
        if (rText != '') 
        {
            if (OptionSetValue != null && OptionSetValue.indexOf(rvalue) != -1)
                isChecked = true;
            var checkbox = "<label><input type=\"checkbox\"  name =\"r\">" + rText  + "<br></label>"
            $(checkbox)
                .attr("value", rvalue)
                .attr("id", "id" + rvalue)
                .attr("checked", isChecked)
                .on('click', function () 
                {
                    //To Set Option Set Values to the related field
                    var ValueField = parent.Xrm.Page.getAttribute("ValueFieldForTheOptionSet").getValue();
                    if ($(this).find('input').is(':checked')) 
                    {
                        if (ValueField == null)
                            ValueField = rvalue+"";
                        else
                            ValueField = ValueField + "," + rvalue
                    }
                    else //Removes the value from the field if it is unchecked
                    {
                        var Value = rvalue + ",";
                        if (ValueField != null) 
                        {
                            if (ValueField.indexOf(Value) != -1)
                                ValueField = ValueField.replace(Value, "");
                            else
                                ValueField = ValueField.replace(rvalue, "")
                        }
                    }
                    parent.Xrm.Page.getAttribute("ValueFieldForTheOptionSet").setValue(ValueField);

                    //To Set Option Set Select Text to the related field
                    var TextField = parent.Xrm.Page.getAttribute("TextFieldForTheOptionSet").getValue();
                    if ($(this).find('input').is(':checked')) 
                    {
                        if (TextField == null)
                            TextField = rText+"";
                        else
                            TextField = TextField + "," + rText
                    }
                    else //Removes the value from the field if it is unchecked
                    {
                        var Text = rText + ",";
                        if (TextField != null) 
                        {
                            if (TextField.indexOf(Text) != -1)
                                TextField = TextField.replace(Text, "");
                            else
                                TextField = TextField.replace(rText, "");
                        }
                    }
                    parent.Xrm.Page.getAttribute("TextFieldForTheOptionSet").setValue(TextField);

                })
                .appendTo(checkboxList);
        }
    });
}
</script>  
<meta charset="utf-8"></head><body style="word-wrap: break-word;"><div id="checkboxList">
</div>
</body></html>
