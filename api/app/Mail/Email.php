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

    /**
     * Create a new message instance.
     *
     * @param $user
     * @param string $viewName
     */
    public function __construct($user, $viewName = 'emails.welcome', $code = "", $subject = "Bienvenue")
    {
        $this->user = $user;
        $this->viewName = $viewName;
        $this->recoverCode = $code;
        $this->subject = $subject;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view($this->viewName)
                    ->with(['user' => $this->user]) // Transmettre des données à la vue
                    ->with(['code' => $this->recoverCode])
                    ->subject($this->subject);
    }
}
