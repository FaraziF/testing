<?php 
use  Page\Acceptance\AccountPage as Vendor;


class DokanSetupWizardCest
{
    public function _before(AcceptanceTester $I)
    {
    }

//     // setupwizard for fresh database
    public function adminSetup(\Step\Acceptance\MultiSteps $I)
    {
    	$I->loginAsAdmin();
    	$I->click('Plugins');
    	//$I->click('//a[contains(text(),"Activate")]');
    	if ($I->tryToClick('//a[contains(text(),"Activate")]')){
             $I->trytodontsee('//a[contains(text(),"Activate")]');     
         }
         $I->wait(4);
        if ($I->tryToClick('Run the Setup Wizard')){
             $I->trytodontsee('Run the Setup Wizard'); 


         }

         $I->wait(3);
         $I->click(['css'=>'.button-primary']);
         //$I->wait(4);
         // $I->fillField(['css'=>'#select2-store_country-container'],'United States (US)');
         $I->fillField('#store_address','London');
         $I->fillField('#store_city','London');
         $I->fillField('#store_postcode','10001');
         $I->fillField('#gmap_api_key','AIzaSyD9N67E6zpGuZqT-o_EI8da5qLbWonLOWw');
         $I->wait(5);
         $I->click('Continue');
         if($I->tryToclick('#new_seller_enable_selling'))
         {
         	$I->wait(4);
         }
        // $I->selectOption('#select2-commission_type-2e-container','Flat');
         $I->fillField('admin_percentage','10');
         if($I->tryToclick('#order_status_change'))
         	{
         		$I->wait(3);
         	}

         $I->click('Continue');
         $I->click('Continue');
         $I->fillField('#shipping_zones[domestic][flat_rate][cost]','10');
         $I->fillField('shipping_zones[intl][flat_rate][cost]','10');
         $I->click('Continue');
         //$I->wait(3);
         $I->click(['css'=>'.wc-wizard-service-item:nth-child(2) > .dokan-wizard-service-enable']);
         $I->fillField('withdraw_limit','50');
         $I->checkOption('//label[contains(.,"Completed")]');
         $I->click('Continue');
         $I->wait(3);
         $I->click('Continue');
         $I->click('Visit Dokan Dashboard');
         


    }
//          //After setting Dokan setupwizard

    public function afterCompleteSetupWizard(\Step\Acceptance\MultiSteps $I)
    {
    	$I->loginAsAdmin();
    	$I->click('Plugins');
    	//$I->click('//a[contains(text(),"Activate")]');
    	if ($I->tryToClick('//a[contains(text(),"Activate")]')){
             $I->trytodontsee('//a[contains(text(),"Activate")]');     
         }

         if ($I->tryToClick('//a[contains(@href, {plugins.php?action=activate&plugin=woocommerce%2Fwoocommerce.php&plugin_status=all&paged=1&s&_wpnonce=886d3b644d")]')){
             $I->trytodontsee('//a[contains(@href, "plugins.php?action=activate&plugin=woocommerce%2Fwoocommerce.php&plugin_status=all&paged=1&s&_wpnonce=886d3b644d")]');     
         }
         $I->wait(4);
        if ($I->tryToClick('Run the Setup Wizard')){
             $I->trytodontsee('Run the Setup Wizard'); 

         }
         $I->click('Dokan');
         $I->click('Settings');
         $I->waitForElementVisible('#dokan_general', 30);
         $I->click('Selling Options');
    	 $I->waitForElementVisible('#dokan_selling', 30);
    	 $I->click('Page Settings');
	     $I->waitForElementVisible('#dokan_pages', 30);
	     $I->click('//a[5]');
            $I->waitForElementVisible('#dokan_appearance', 30);
            $I->checkError();
        $I->click('Privacy Policy');
            $I->waitForElementVisible('#dokan_privacy', 30);

    }
    //vendor completed setupwizard

     public function afterCompleteSetupWizard(\Step\Acceptance\MultiSteps $I)
    {
    	$I->loginAsVendor();
    	$I->amOnPage(Vendor::$URL);
      $I->click(Vendor::$registrationLink);
      $I->fillField(Vendor::$emailField, randomGenerate()->email );
      $I->fillField(Vendor::$vendorPasswordField, 'mndjna132536+09+@1_+' );
      $I->click(Vendor::$userRol);
      $I->waitForElement('.show_if_seller', 30);
      $I->fillField(Vendor::$firstName, randomGenerate()->firstName);
      $I->fillField(Vendor::$lastName,  randomGenerate()->lastName);
      $I->fillField(Vendor::$companyName, randomGenerate()->firstName);
      $I->fillField(Vendor::$shopUrl,     randomGenerate()->firstName);
      $I->fillField(Vendor::$phoneNumber,  randomGenerate()->phoneNumber);
      $I->click(Vendor::$registrationButton);
      $I->wait(3);
      $I->click(['css'=>'.button-primary']);
      $I->wait(2);
      $I->fillField('#address[city]','NewYork');
      $I->fillField('#address[zip]','10001');
      $I->appendfield('#address[country]','United States (US)');
      $I->appendfield('#calc_shipping_state','New York');
     // $I->checkOption('#show_email');
      $I->click('Continue');
      $I->click('Continue');
      $I->click('Go to your Store Dashboard!');

    }

}
 function randomGenerate() 
    {
      return \Faker\Factory::create();
    }
