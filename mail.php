<?php
require "mailer/PHPMailerAutoload.php";

// PREPARE THE BODY OF THE MESSAGE

include "config.php";


if (isset($_POST["submit"])) {
   
  error_reporting(E_ALL & ~E_NOTICE);

// Report all PHP errors
error_reporting(E_ALL);

// Report all PHP errors
error_reporting(-1);

// Same as error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
    $name = $_POST["firstname"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $grade = $_POST["grade"];

    if (function_exists("date_default_timezone_set")) {
        date_default_timezone_set("Asia/Kolkata");
    }

    $stmt = "SELECT * FROM admission where phone='" . $phone . "'";
    $result = $conn->query($stmt);
     $count_array = $result->num_rows;

    if ($count_array == 0) 
    {
      
        $date = date("Y-m-d h:i:s");
        $sql =
            "INSERT INTO admission (name, email, phone, grade, date) VALUES ('" .
            $name .
            "','" .
            $email .
            "', '" .
            $phone .
            "',  '" .
            $grade .
            "' , '" .
            $date .
            "')";
        if (!($result = $conn->query($sql))) {
            die("There was an error running the query [" . $conn->error . "]");
        }

        $subject = "MVM ADMISSIONS Form Enquiry";

        $message = "<html><body>";

        $message .= "<div>";

        $message .=
            '<img src="https://mvmmogappair.in/images/logo.png" alt="Logo"  style="margin: 0 auto;display: table;" />';

        $message .= "</div>";

        $message .=
            '<table rules="all" style="border-color: #666;width: 500px;margin: 0 auto;border: 1px solid #eee;" cellpadding="20"" cellpadding="20">';

        $message .=
            "<tr><td><strong>Name :</strong> </td><td>" .
            strip_tags($_POST["firstname"]) .
            "</td></tr>";
        $message .=
            "<tr><td><strong>Email:</strong> </td><td>" .
            strip_tags($_POST["email"]) .
            "</td></tr>";
        $message .=
            "<tr><td><strong>Phone:</strong> </td><td>" .
            strip_tags($_POST["phone"]) .
            "</td></tr>";
        $message .=
            "<tr><td><strong>Grade:</strong> </td><td>" .
            strip_tags($_POST["grade"]) .
            "</td></tr>";
        $message .=
            "<tr style='background: #eee;'><td><strong>Powered By </strong> </td><td>maharishividhyamandir </td></tr>";

        //  MAKE SURE THE "FROM" EMAIL ADDRESS DOESN'T HAVE ANY NASTY STUFF IN IT

        $mail = new PHPMailer();

        $mail->SMTPDebug = 0; // Enable verbose debug output
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = "mail.ayatiworks.com"; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = "mail@mvmmogappair.in"; // SMTP username
        $mail->Password = "!d!X[_Wgw^RK"; // SMTP password
        $mail->SMTPSecure = "ssl"; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465;
        $mail->setFrom("mail@mvmmogappair.in");
        $to = "admission@mvmmogappair.in";
        $mail->addAddress($to);
        $mail->Subject = $subject;
        $mail->Body = $message;
        $mail->IsHTML(true);

        if ($mail->send()) {
            
            echo '<META HTTP-EQUIV="Refresh" Content="0; URL=thankyou">';

        
        //   echo "<script type='text/javascript'>alert('Your Registration Successfully Submitted.Our Team will be get back to you shortly')</script>";    
        //     header(
        //         "Location:https://mvmmogappair.in/mvm_admission/index.php?msg=success"
        //     );
        } else {
            echo "There was a problem sending the email.";
            // echo '<META HTTP-EQUIV="Refresh" Content="0; URL=enquiry">';
        }
      
    } else {
      echo "<script type='text/javascript'>alert('Your Mobile Number Already Exists. kindly Enter New Mobile Number to proceed')</script>";
    echo "<script>window.location.href='index.php?msg=alreadyexists';</script>";
    }
    
}

?>
