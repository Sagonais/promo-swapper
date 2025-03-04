
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      console.log('Registering with:', { name, email, password });
      setIsLoading(false);
      // Handle successful registration (redirect, etc.)
    }, 1500);
  };

  // Password validation
  const passwordRules = [
    { id: 'length', text: 'Au moins 8 caractères', valid: password.length >= 8 },
    { id: 'number', text: 'Au moins un chiffre', valid: /[0-9]/.test(password) },
    { id: 'special', text: 'Au moins un caractère spécial', valid: /[!@#$%^&*]/.test(password) },
    { id: 'match', text: 'Les mots de passe correspondent', valid: password === confirmPassword && password !== '' },
  ];

  const isPasswordValid = passwordRules.every(rule => rule.valid);

  return (
    <Layout className="flex items-center justify-center py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour à l'accueil
          </Link>
        </div>

        <Card className="border-border/50 shadow-soft">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold tracking-tight">Créer un compte</CardTitle>
            <CardDescription>
              Inscrivez-vous pour commencer à partager et profiter des codes promo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password validation feedback */}
              {password && (
                <div className="space-y-2 p-3 bg-promotion-secondary/50 rounded-md text-sm">
                  <h4 className="font-medium text-foreground">Votre mot de passe doit contenir :</h4>
                  <ul className="space-y-1">
                    {passwordRules.map(rule => (
                      <li key={rule.id} className="flex items-center">
                        <CheckCircle className={`h-4 w-4 mr-2 ${rule.valid ? 'text-promotion-success' : 'text-muted-foreground'}`} />
                        <span className={rule.valid ? 'text-foreground' : 'text-muted-foreground'}>
                          {rule.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-11" 
                disabled={isLoading || !isPasswordValid}
              >
                {isLoading ? 'Création en cours...' : 'Créer un compte'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou s'inscrire avec
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-11">
                <GoogleIcon className="h-5 w-5 mr-2" />
                Google
              </Button>
              <Button variant="outline" className="h-11">
                <AppleIcon className="h-5 w-5 mr-2" />
                Apple
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-center text-muted-foreground pt-4">
              Déjà un compte?{" "}
              <Link to="/login" className="text-promotion-primary hover:underline">
                Se connecter
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  );
}

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.94c1.5 0 2.75-.58 3.68-1.55 2-2.11 1.83-5.97.52-9.7-1.28.67-3.04 1.37-5.2 1.37-2.15 0-3.91-.7-5.2-1.37-1.3 3.73-1.48 7.59.53 9.7.93.97 2.18 1.55 3.67 1.55z" />
      <path d="M12 3.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z" />
      <path d="M4 7.5c2 0 3.5 1.5 5 1.5s3-1.5 5-1.5 3.5 1.5 5 1.5" />
    </svg>
  );
}

export default Register;
