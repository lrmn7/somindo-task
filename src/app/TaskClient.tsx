'use client';

import { TASKS } from "@/lib/tasks";
import { CheckCircle, Circle, ExternalLink, Loader, Award, Lock, Unlock, AlertTriangle, LogIn } from "lucide-react";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type UserTaskStatus = Pick<User, 'followedTwitter' | 'retweetedPost' | 'likedPost' | 'joinedDiscord'>;

export default function TaskClient({ user, isDiscordConnected }: { user: UserTaskStatus | null, isDiscordConnected: boolean }) {

    const [loading, setLoading] = useState<string | boolean>(false);
    const [interactedTaskIds, setInteractedTaskIds] = useState<Set<string>>(new Set());
    const router = useRouter();
    const isDisabled = !user || !isDiscordConnected;

    const preparatoryTasks = Object.values(TASKS).map(task => ({
        ...task,
        isCompleted: user ? user[task.id as keyof UserTaskStatus] || false : false
    }));

    const allPrerequisitesCompleted = user ? preparatoryTasks.every(task => task.isCompleted) : false;

    const handleGoClick = (taskId: string) => {
        setInteractedTaskIds(prevIds => {
            const newIds = new Set(prevIds);
            newIds.add(taskId);
            return newIds;
        });
    };

    const handleVerify = async (taskId: string) => {
        setLoading(taskId);

        const verifyPromise = async () => {
            const res = await fetch('/api/tasks/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ taskId }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({
                    message: 'Verification failed. Try again later.'
                }));
                throw new Error(errorData.message);
            }
            
            const successData = await res.json();
            router.refresh();
            return successData.message;
        };

        toast.promise(verifyPromise(), {
            loading: 'Verifying task...',
            success: (message) => message,
            error: (err) => err.message,
        });

        try {
            await verifyPromise();
        } catch (e) {
        } finally {
            setLoading(false);
        }
    };

    const handleClaimReward = async () => {
        setLoading('claim-reward');
        const claimPromise = async () => {
            const res = await fetch('/api/tasks/claim-reward', { method: 'POST' });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ message: 'Could not claim reward.' }));
                throw new Error(errorData.message || 'Could not claim reward. Make sure you have completed all tasks.');
            }
            const data = await res.json();
            return data.message || '🎉 Reward role claimed successfully!';
        };

        toast.promise(claimPromise(), {
            loading: 'Claiming your reward...',
            success: (message) => message,
            error: (err) => err.message,
        });

        try {
            await claimPromise();
        } catch (e) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold text-accent mb-6">Somnia Indonesia</h1>
            
            {!user ? (
                <div className="bg-blue-900/30 border border-blue-500/50 text-blue-200 p-4 rounded-lg mb-6 flex items-center">
                    <LogIn className="h-6 w-6 mr-3 text-blue-400 flex-shrink-0" />
                    <div>
                        <h3 className="font-bold">gSomnia</h3>
                        <p className="text-sm">Please login first to complete the task.</p>
                    </div>
                </div>
            ) : !isDiscordConnected ? (
                <div className="bg-yellow-900/30 border border-yellow-500/50 text-yellow-200 p-4 rounded-lg mb-6 flex items-center justify-between">
                    <div className="flex items-center">
                        <AlertTriangle className="h-6 w-6 mr-3 text-yellow-400" />
                        <div>
                            <h3 className="font-bold">gSomnia</h3>
                            <p className="text-sm">Please connect your Discord to continue.</p>
                        </div>
                    </div>
                    <Link href="/api/auth/signin/discord">
                        <Button variant="outline">Connect Discord</Button>
                    </Link>
                </div>
            ) : null}

            <div className={`space-y-4 transition-opacity ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
                
                {preparatoryTasks.map((task, index) => (
                    <motion.div 
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-secondary rounded-lg border border-transparent hover:border-accent transition-colors">
                            <div className="flex items-center min-w-0 sm:mr-4">
                                {task.isCompleted ? <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" /> : <Circle className="w-6 h-6 text-gray-400 mr-4 flex-shrink-0" />}
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-lg">{task.title}</h3>
                                    <p className="text-gray-300 text-sm">{task.description}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-end space-x-2 flex-shrink-0 mt-4 sm:mt-0" style={{ minWidth: '160px' }}>
                                {task.isCompleted ? (
                                    <div className="text-green-500 font-semibold px-3 py-2 text-right">
                                        Completed
                                    </div>
                                ) : (
                                    <>
                                        <a href={task.link} target="_blank" rel="noopener noreferrer" onClick={() => handleGoClick(task.id)}>
                                            <Button variant="outline">Go <ExternalLink className="w-4 h-4 ml-2" /></Button>
                                        </a>
                                        <Button onClick={() => handleVerify(task.id)} disabled={!!loading || !interactedTaskIds.has(task.id)}>
                                            {loading === task.id ? <Loader className="animate-spin" /> : 'Verify'}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}

                <div className="pt-4">
                    <hr className="border-secondary" />
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: preparatoryTasks.length * 0.05 }}
                >
                    <div className={`p-4 bg-secondary rounded-lg border transition-all ${allPrerequisitesCompleted ? 'border-accent' : 'border-transparent'}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center min-w-0 mr-4">
                                {allPrerequisitesCompleted ? <Unlock className="w-6 h-6 text-accent mr-4 flex-shrink-0" /> : <Lock className="w-6 h-6 text-gray-500 mr-4 flex-shrink-0" />}
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-lg truncate">OG Somindo</h3>
                                    <p className="text-gray-300 text-sm truncate">Claim your reward role after completing all tasks above.</p>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <Button onClick={handleClaimReward} disabled={!allPrerequisitesCompleted || !!loading}>
                                    {loading === 'claim-reward' ? <Loader className="animate-spin mr-2" /> : <Award className="mr-2 h-5 w-5"/>}
                                    Claim Role
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}