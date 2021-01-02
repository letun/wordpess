<?php
function mo_openid_integrations(){
    ?>
    <div class="mo_openid_table_layout">
    <!-- Woocommerce form-->
    <form>
        <br>
        <hr>
        <div class="mo_openid_highlight">
            <h3 style="margin-left: 2%;line-height: 210%;color: white;"><?php echo mo_sl('Woocommerce Integration');?></h3>
        </div>
        <table id="woocommerce_integration"><tr><td>
                    <br/><label><b> <span style="color: red">*</span> <?php echo mo_sl('This feature is available in premium version only. To use this feature, please upgrade to  premium plugin.');?></b></label>
                    <p><b><?php echo mo_sl('If enabled, first name, last name and email are pre-filled in billing details of a user and on the Woocommerce checkout page.');?></b></p>


                    <label class="mo_openid_checkbox_container_disable"><strong><?php echo mo_sl('Sync Woocommerce checkout fields');?></strong>
                        <input  type="checkbox"/>
                        <span class="mo_openid_checkbox_checkmark_disable"></span>
                    </label>
                    <input disabled type="button" value="<?php echo mo_sl('Save');?> "  class="button button-primary button-large" />
                    <br>

                    <label class="mo_openid_note_style" style="cursor: auto">For more information please refer to the <a href="https://plugins.miniorange.com/guide-to-configure-woocommerce-with-wordpress-social-login" target="_blank">WooCommerce Guide</a>  /  <a href="https://youtu.be/M20AR-wbKNI" target="_blank">WooCommerce Video</a></label>


                </td></tr></table>
    </form>
        <br>

        <hr>

        <table id="buddypress_mapping" style="width:100%">
            <tr>
                <td>
                    <div class="mo_openid_highlight">
                        <h3 style="margin-left: 2%;line-height: 210%;color: white;"><?php echo mo_sl('BuddyPress / BuddyBoss Extended Attributes Mapping');?></h3>
                    </div>
                    <br/>
                    <label><b> <span style="color: red">*</span><?php echo mo_sl('This feature is available in premium version only. To use this feature, please upgrade to premium plugin.');?></b></label>

                    <label class="mo_openid_note_style" style="cursor: auto">For more information please refer to the <a href="https://plugins.miniorange.com/guide-to-configure-buddypress-with-wordpress-social-login" target="_blank">BuddyPress Guide</a>  /  <a href="https://youtu.be/Iia1skKRYBU" target="_blank">BuddyPress Video</a></label><br>

                </td>
            </tr>
        </table>

        <hr>
        <div id="paid_memb_pro">
            <div class="mo_openid_highlight">
                <h3 style="margin-left: 2%;line-height: 210%;color: white;"><?php echo mo_sl('Paid Memberships Pro');?></h3>
            </div><br/>
        <label><b> <span style="color: red">*</span> <?php echo mo_sl('This feature is available in premium version only. To use this feature, please upgrade to premium plugin.');?></b></label>
        <br>
            <label class="mo_openid_note_style" style="cursor: auto">For more information please refer to the <a href="https://plugins.miniorange.com/guide-to-configure-paid-membership-pro-with-wordpress-social-login" target="_blank">Paid Membership Pro Guide</a>  /  <a href="https://youtu.be/DHgIR6kyX3A" target="_blank">Paid Membership Pro Video</a></label><br>
        <!--MailChimp form-->

        <form>
            <hr>
            <div class="mo_openid_highlight">
              <h3 style="margin-left: 2%;line-height: 210%;color: white;"><?php echo mo_sl('MailChimp Integration');?></h3>
            </div>
            <table id="maichimp_integration"><tr><td>
            <br/><label><b> <span style="color: red">*</span><?php echo mo_sl('This feature is available in premium version only. To use this feature, please upgrade to premium plugin.');?></b></label>
                        <p><b><?php echo mo_sl('A user is added as a subscriber to a mailing list in MailChimp when that user registers using social login. First name, last name and email are also captured for that user in the Mailing List.');?></b></p>

                        <label class="mo_openid_note_style" style="cursor: auto">For more information please refer to the <a href="https://plugins.miniorange.com/guide-to-configure-mailchimp-integration-with-wordpress-social-login" target="_blank">MailChimp Guide</a>  /  <a href="https://www.youtube.com/watch?v=3Zh5gUX0O_A" target="_blank">MailChimp Video</a></label><br>
                        <b><?php echo mo_sl('Audience ID');?>:</b><input disabled size="50" class="mo_openid_textfield_css" style="border: 1px solid ;border-color: #0867b2;margin-left: 1%" > <br><br>
                        <b><?php echo mo_sl('API Key:');?> </b><input disabled size="50" class="mo_openid_textfield_css" style="border: 1px solid ;border-color: #0867b2" type="text" ><br><br>


                        <label class="mo_openid_checkbox_container_disable"><strong><?php echo mo_sl('Ask user for permission to be added in MailChimp Subscriber list');?> </strong>
                            <input  type="checkbox"/>
                            <span class="mo_openid_checkbox_checkmark_disable"></span>
                        </label>

                        (<?php echo mo_sl('If unchecked, user will get subscribed during registration.');?>
                        <br><br>
                        <b><?php echo mo_sl('Click on Download button to get a list of emails of WordPress users registered on your site. You can import this file in MailChimp.');?><br><br>
                            <input disabled type="button" value="Save "  class="button button-primary button-large" />
                            <a disabled="disabled" style="width:190px;" class="button button-primary button-large">
                                <?php echo mo_sl('Download emails of users');?>
                            </a><br>
                    </td></tr></table>
        </form>
        </div>
    <hr>

    <!--adding and mapping custom attribute--><br/>
    <div class="mo_openid_highlight">
        <h3 style="margin-left: 2%;line-height: 210%;color: white;"><?php echo mo_sl('Custom Attributes Mapping');?></h3>
    </div>
    <form>
        <table id="custom_attr" style="width:100%">
            <tr>
                <td colspan="3"><br/><label><b> <span style="color: red">*</span> <?php echo mo_sl('This feature is available in premium version only. To use this feature, please upgrade to premium plugin.');?></b></label></td>
            </tr>
            <tr>
                <td><br><input type="text" disabled placeholder="Custom Attribute Name" class="mo_openid_textfield_css" style="border: 1px solid ;border-color: #0867b2;width: 80%"/></td>
                <td><br>
                    <select disabled class="mo_openid_textfield_css" style="border: 1px solid ;border-color: #0867b2;width: 60%" >
                        <option value="" ><?php echo mo_sl('Select Attribute');?></option>
                    </select>
                </td>
                <td> <br><input type="button" disabled value="+" class=" button-primary" />&nbsp;
                    <input type="button" disabled value="-" class=" button-primary" />
                </td> </tr>
            <tr id="mo_openid_custom_attribute"><td></td></tr>
            <tr>
                <td align="center"colspan="3"><br>
                    <input type="hidden"/>
                    <input disabled type="button" value="Save Attributes"  class="button button-primary button-large"/>
                    &nbsp &nbsp <a disabled="disabled" class="button button-primary button-large"><?php echo mo_sl('Cancel');?></a>
                </td>
            </tr>
        </table>
    </form>

    <script>
        //to set heading name
        jQuery('#mo_openid_page_heading').text('<?php echo mo_sl('Integrations');?>');
        var temp = jQuery("<a style=\"left: 1%; padding:4px; position: relative; text-decoration: none\" class=\"mo-openid-premium\" href=\"<?php echo add_query_arg(array('tab' => 'licensing_plans'), $_SERVER['REQUEST_URI']); ?>\">PRO</a>");
        jQuery("#mo_openid_page_heading").append(temp);
    </script>
    <?php

}