#!/usr/bin/perl -CSAD


use Data::Dumper;
use locale;
use Encode;
use utf8;
system('stty iutf8'); # otherwise backspace only takes off half of a utf8 character like ł http://www.unix.com/shell-programming-scripting/155079-perl-script-backspace-not-working-unicode-characters.html

use strict; 
my @masc_nouns =  qw/
house dom domy
cat kot koty
table stół stóły
shop sklep sklepy
church koscioł koscioły
car samochód samochody
boy chłopiec chłopcy
pen długopis długopisy
shoe but buty
bank bank banki
key klucz klucze
plate talerz talerze
hat kapelusz kapelusze
horse koń konie
/;

my @fem_nouns = qw/
woman kobieta kobiety
school szkoła szkoły
sister siostra siostry
wife żona żony
cloud chmura chmury
fish ryba ryby
bench ławka ławki
book książka książki
daughter córka córki
tshirt koszulka koszulki
skirt spódnica spódnice
street ulica ulice
road droga drogi
/;

#shirt koszula koszuli???
my @neuter_nouns = qw/
apple jabłko jabłka
chair krzesło krzesła
soap mydło mydła
bed łóżko łóżka
/;

my @adj_defs = qw/
  large duże duża duże
  small mały mała małe
  good dobry dobra dobre
  bad zły zła złe
  tasty smaczny smaczna smaczne
  nasty niesmazcny niesmaczna niesmaczne
  clean czysty czysta czyste
  wet mokry mokra mokre
  dry suchy sucha suche
  dirty brudny brudna brudne
  sick chory chora chore
  tired zmęczony zmęczona zmęczone
  hot gorący gorąca gorące
  cold zimny zimna zimne
  white biały biała białe
  black czarny czarna czarne
  red czerwony czerwona czerwone
  yellow zołty zołta zołte
  blue niebieski niebieska niebieskie
  tall wysoki wysoka wysokie
  short(low) niski niska niskie
  polish polski polska polskie
  long długi długa długie
  expensive drogi droga drogie
  short(hair) krótki krótka krótkie	
  distant daleki daleka dalekie
  near bliski bliska bliskie
/;
{
  package Noun;
  use base qw/Class::Accessor::Fast/;

    __PACKAGE__->mk_accessors(qw/english nom_sing nom_pl gender/);

    sub new {
        my $class = shift;
        my ($english, $nom_sing, $nom_pl, $gender) = @_;

        return $class->SUPER::new({english => $english, nom_sing => $nom_sing, nom_pl => $nom_pl, gender => $gender});
    }
}

{ package Adjective;
  use base qw/Class::Accessor::Fast/;

    __PACKAGE__->mk_accessors(qw/english m f n/);

    sub new {
        my $class = shift;
        my ($english, $m, $f, $n) = @_;
        return $class->SUPER::new({english => $english, m => $m, f => $f, n => $n});
    }
}

my (@nouns, @adjectives);
while (@masc_nouns){
    push @nouns, new Noun(splice(@masc_nouns,0,3), 'm');
}
while (@fem_nouns){
    push @nouns, new Noun(splice(@fem_nouns,0,3), 'f');
}
while (@neuter_nouns){
    push @nouns, new Noun(splice(@neuter_nouns,0,3), 'n');
}

while (@adj_defs){
    push @adjectives, new Adjective(splice(@adj_defs,0,4));
}



WORD: while (1){
    my $adj = $adjectives[int(rand(@adjectives))];
    my $noun = $nouns[int(rand(@nouns))];
    print $adj->english,', ', $noun->english,"\n";
    my $gender = $noun->gender;

    my $line;
    TRY: while (1) {
        chomp ($line = <STDIN>);
        my $target = $noun->nom_sing . ' jest ' . $adj->$gender;
        if ($line eq '?'){
            print ucfirst $target, "\n";
            next;
        }
        $line =~ s/[\.\?\!]$//g;
        if ($line eq ucfirst $target){
            print right(),"\n";
            last TRY 
        }

        print wrong()."(You entered $line)\n";
    }
    print "\n...now the plural?\n";
    TRY: while (1) {
        chomp ($line = <STDIN>);
        $line =~ s/\.$//;
        my $target = $noun->nom_pl . ' są ' . $adj->n;
        if ($line eq '?'){
            print ucfirst $target, "\n";
            next;
        }
        $line =~ s/[\.\?\!]$//g;
        if ($line eq ucfirst $target){
            print "\nYes!!!\n";
            last TRY 
        }

        print wrong(). "(You entered $line)\n";
    }
}



sub wrong {
    my @wrongs = (
        'Not quite.',
        'Nice try, but no.',
        'Sorry, that was incorrect.',
        "I'm sorry, that's just wrong.",
        "Hello?  Try again.",
        "Weren't paying attention in class, were you?",
        "Nope",
        "Hola, estupido!", 
        "Blonde hi-five!",
        "EPIC FAAAIIIL",
        "No, the keyboard should be the other way.",
        "Hohoho! You were the class clown, I bet.",
        "Hmm... maybe you should get a Leapfrog instead.",
        "(^M^) The pig thinks your answer is wrong.",
        "Awwww, look at that sad face!",
        "Aw, come ON!",  
    );
    my $i = int(rand(scalar @wrongs));
    return $wrongs[$i].' ';
}
sub right {
    my @rights = (
        'Yes!',
        "That's it!",
        "Rock on!",
        "You got it.",
        "Thar she be.",
        "Yes indeedilly-do!",
        "Good enough...",
        "Wrong...nah, I'm joking. Right!!!",
        "You have my respect, young one.",
        "Huzzah!",
        "...and there was much rejoicing...",
        "He got it right, everyone!",
        "Man, you're making me look bad next to you!",
        "You're too good.",
    );
    my $i = int(rand(scalar @rights));
    return $rights[$i].' ';
}

