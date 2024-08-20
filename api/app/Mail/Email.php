<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Email extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $viewName;
    public $recoverCode;
    public $subject;
    public $message;

    /**
     * Create a new message instance.
     *
     * @param $user
     * @param string $viewName
     */
    public function __construct($user, $viewName = 'emails.welcome', $code = "", $subject = "Bienvenue",  $text = "")
    {
        $this->user = $user;
        $this->viewName = $viewName;
        $this->recoverCode = $code;
        $this->subject = $subject;
        $this->text = $text;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view($this->viewName)
                    ->with([
                        'user' => $this->user,
                        'code' => $this->recoverCode,
                        'text' => $this->text,
                        'subject' => $this->subject,
                    ])
                    ->subject($this->subject);
    }
}
